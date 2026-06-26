# UBAP App Wallet Integration Guide

## Overview

The UBAP App Wallet system enables the application to receive Pi payments directly into a dedicated app wallet address. When users deposit Pi into their UBAP balance, the funds are:

1. Received by the app wallet
2. Recorded in the transaction ledger
3. Credited to the user's internal UBAP balance

## Setup Steps

### 1. Create Database Tables

Run the following SQL in your Supabase dashboard:

```bash
# Run the setup script in Supabase SQL Editor
# File: /scripts/setup-app-wallet.sql
```

This creates:
- `app_wallets` - Stores the app's Pi wallet
- `wallet_transactions` - Records all incoming/outgoing transactions
- Indices for performance optimization
- Row Level Security (RLS) policies
- Trigger functions for automatic balance updates

### 2. Set Pi API Key (Production)

For production Pi Network integration:

1. Go to https://develop.pi
2. Navigate to your app settings
3. Get your **API Key** and **App Wallet Address**
4. In Vercel/Environment Variables, set:
   ```
   PI_API_KEY=<your_api_key_here>
   PI_NETWORK=mainnet  # or testnet
   ```

### 3. Initialize the App Wallet

The app wallet is initialized automatically on first use. You can trigger initialization manually:

```typescript
import { initializeAppWallet } from "@/lib/app-wallet-service"

// Initialize or retrieve wallet
const wallet = await initializeAppWallet()
console.log("App wallet address:", wallet.wallet_address)
```

### 4. Update Payment Flow

The payment flow is already integrated in `/app/api/pi/complete/route.ts`. When a user completes a payment:

```
User deposits Pi
    ↓
Pi.createPayment() opens user's wallet
    ↓
User confirms in Pi Wallet
    ↓
/api/pi/approve (server approves with Pi)
    ↓
Pi blockchain confirms
    ↓
/api/pi/complete (server records txid + wallet update)
    ↓
User's UBAP balance credited
App wallet updated with incoming transaction
```

## API Functions

### Initialize Wallet
```typescript
import { initializeAppWallet } from "@/lib/app-wallet-service"

const wallet = await initializeAppWallet()
```

### Record Incoming Payment
```typescript
import { recordIncomingPayment } from "@/lib/app-wallet-service"

await recordIncomingPayment(
  paymentId,    // From Pi SDK
  txid,         // Blockchain txid
  amount,       // Amount in Pi
  userId        // User making payment
)
```

### Get Wallet Balance
```typescript
import { getAppWalletWithBalance } from "@/lib/app-wallet-service"

const walletInfo = await getAppWalletWithBalance()
console.log("Balance:", walletInfo.current_balance_pi)
console.log("Received:", walletInfo.total_received_pi)
console.log("Withdrawn:", walletInfo.total_withdrawn_pi)
```

### Get Transactions
```typescript
import { getAppWalletTransactions } from "@/lib/app-wallet-service"

const transactions = await getAppWalletTransactions(limit, offset)
```

## Admin Dashboard

Access the app wallet admin dashboard:

**URL:** `/admin/wallet`

**Features:**
- View current balance
- See total received and withdrawn amounts
- Browse transaction history
- Copy wallet address
- Download wallet report (JSON)
- View network and creation date

## Transaction Lifecycle

### Incoming Transaction (User Deposit)

```
Status: pending
  ↓
Pi confirms payment
  ↓
Status: completed
  ↓
App wallet balance updated
```

### Outgoing Transaction (App Withdrawal)

```
Status: pending (created)
  ↓
App submits withdrawal to Pi
  ↓
Status: in_transit (optional)
  ↓
Pi confirms
  ↓
Status: completed
  ↓
App wallet balance deducted
```

## Transaction Fields

Each transaction record contains:

- `id` - Unique transaction ID
- `app_wallet_id` - Reference to app wallet
- `transaction_type` - "incoming", "outgoing", or "internal_transfer"
- `from_address` - Sender Pi address
- `to_address` - Recipient Pi address
- `amount_pi` - Amount in Pi (8 decimal places)
- `currency` - Always "pi"
- `status` - pending/completed/failed/cancelled
- `txid` - Blockchain transaction ID
- `payment_id` - Pi SDK payment ID
- `user_id` - User who initiated (if applicable)
- `description` - Transaction description
- `created_at` - Timestamp
- `updated_at` - Last update timestamp

## Database Schema

### app_wallets
```sql
id                    UUID PRIMARY KEY
wallet_address        TEXT UNIQUE
wallet_type           TEXT ('pi_app_wallet')
network               TEXT ('pi_testnet' | 'pi_mainnet')
total_received_pi     DECIMAL(20, 8)
total_withdrawn_pi    DECIMAL(20, 8)
current_balance_pi    DECIMAL(20, 8)
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

### wallet_transactions
```sql
id                    UUID PRIMARY KEY
app_wallet_id         UUID (FK to app_wallets)
transaction_type      TEXT
from_address          TEXT
to_address            TEXT
amount_pi             DECIMAL(20, 8)
currency              TEXT ('pi')
status                TEXT
txid                  TEXT UNIQUE
payment_id            TEXT
user_id               UUID (FK to users)
description           TEXT
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

## Monitoring

### Check Wallet Health

```typescript
import { getWalletStats } from "@/lib/app-wallet-service"

const stats = await getWalletStats()
console.log("Stats:", {
  incoming_count: stats.incoming_count,
  outgoing_count: stats.outgoing_count,
  total_incoming: stats.total_incoming,
  total_outgoing: stats.total_outgoing,
  pending_count: stats.pending_count,
})
```

### View Recent Transactions

Visit `/admin/wallet` to see:
- All transactions in real-time
- Transaction status (pending/completed/failed)
- Amount and dates
- Link to blockchain explorers (via txid)

## Error Handling

If a payment fails to record in the app wallet:

1. The payment is still completed with Pi
2. A log entry is created for investigation
3. Manual reconciliation can be done via admin dashboard

To manually fix a transaction:

```typescript
import { updateTransactionStatus } from "@/lib/app-wallet-service"

// Mark as completed with the actual txid
await updateTransactionStatus(transactionId, "completed", txid)
```

## Security Notes

1. **RLS Policies**: Only app admins can modify wallet data
2. **Triggers**: Balance updates are automated and auditable
3. **Immutability**: Transaction records cannot be deleted, only marked failed
4. **Audit Trail**: All changes are timestamped and logged

## Testing

### Sandbox Mode (No PI_API_KEY)

If PI_API_KEY is not set, payments work in sandbox mode:
- Payments are marked as completed locally
- No blockchain interaction
- Ideal for testing

To enable production mode:
1. Set PI_API_KEY in Vercel
2. Set PI_NETWORK=mainnet
3. Restart application

## Troubleshooting

### Wallet Not Initializing
```
Error: App wallet not initialized
Solution: Check Supabase connection and run setup-app-wallet.sql
```

### Payment Not Recording
```
Error: Failed to record payment in app wallet
Solution: Check user_id and amount are provided in complete request
```

### Balance Mismatch
```
Check RLS policies and trigger function:
SELECT * FROM pg_indexes WHERE tablename = 'wallet_transactions'
SELECT COUNT(*) FROM wallet_transactions
SELECT SUM(amount_pi) FROM wallet_transactions WHERE status = 'completed'
```

## Next Steps

1. Run the database setup script
2. Set PI_API_KEY in Vercel
3. Test a deposit in Pi Browser
4. Monitor wallet via `/admin/wallet`
5. Set up transaction webhooks (optional)

## Support

For issues:
1. Check logs at `/admin/wallet`
2. Verify database schema: `SELECT * FROM app_wallets`
3. Review transaction history: `SELECT * FROM wallet_transactions LIMIT 10`
4. Test manually: `initializeAppWallet()` in console
