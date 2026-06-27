# UBAP Database Setup Guide avec Supabase

## Étape 1: Créer un compte Supabase (GRATUIT)

1. Allez sur https://supabase.com
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub
4. Créez une nouvelle organisation "UBAP"
5. Créez un nouveau projet:
   - Nom: `ubap-production`
   - Database Password: (générez un mot de passe fort)
   - Region: **Frankfurt (Europe Central)** (le plus proche de l'Afrique)

## Étape 2: Récupérer vos clés API

Dans votre projet Supabase:
1. Allez dans `Settings` → `API`
2. Copiez les informations suivantes:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (longue chaîne)

## Étape 3: Ajouter les variables d'environnement dans Vercel

1. Allez dans votre projet Vercel (ubapi.vercel.app)
2. `Settings` → `Environment Variables`
3. Ajoutez:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
   ```
4. Cliquez sur "Save"

## Étape 4: Exécuter le script SQL

1. Dans Supabase, allez dans `SQL Editor`
2. Cliquez sur "New query"
3. Copiez tout le contenu de `/scripts/create-ubap-tables.sql`
4. Collez dans l'éditeur
5. Cliquez sur "Run" (▶️)
6. Vérifiez qu'il n'y a pas d'erreurs

## Étape 5: Vérifier les tables créées

1. Allez dans `Table Editor`
2. Vous devriez voir toutes ces tables:
   - ✅ users
   - ✅ transactions
   - ✅ virtual_cards
   - ✅ savings_goals
   - ✅ group_savings
   - ✅ group_savings_members
   - ✅ bank_accounts
   - ✅ mobile_money_accounts
   - ✅ escrow_transactions
   - ✅ material_holdings

## Étape 6: Activer l'authentification Pi Network

1. Dans Supabase: `Authentication` → `Providers`
2. Activez "Custom" provider
3. Configurez avec Pi Network OAuth (quand disponible)

## Étape 7: Re-déployer l'application

1. Dans Vercel, allez dans votre projet
2. `Deployments` → Cliquez sur les 3 points du dernier déploiement
3. Cliquez "Redeploy"
4. ✅ Votre application utilise maintenant Supabase!

## Limites du Plan Gratuit Supabase

- ✅ **500 MB de stockage** (suffisant pour 50,000+ utilisateurs)
- ✅ **2 GB de bande passante/mois** (environ 10,000 requêtes/jour)
- ✅ **Authentification illimitée**
- ✅ **Row Level Security (RLS)** activée
- ✅ **Sauvegardes quotidiennes automatiques**

Parfait pour démarrer! Vous pouvez upgrader plus tard si nécessaire.

## Structure des Données

### Table `users`
Stocke tous les comptes utilisateurs UBAP avec leur Pi UID, balances, pays, langue préférée.

### Table `transactions`
Historique complet de toutes les transactions (envois, réceptions, conversions, paiements de factures).

### Table `virtual_cards`
Cartes virtuelles Visa/Mastercard de chaque utilisateur avec statut (active/frozen).

### Table `savings_goals`
Objectifs d'épargne individuels des utilisateurs avec progression.

### Table `group_savings`
Épargnes collectives (tontines) avec membres.

### Table `bank_accounts`
Comptes bancaires liés de chaque utilisateur.

### Table `mobile_money_accounts`
Comptes Mobile Money (MTN, Orange, Airtel, etc.) liés.

### Table `escrow_transactions`
Transactions en escrow avec conditions de release.

### Table `material_holdings`
Holdings en métaux précieux (or, argent, diamant).

## Sécurité

✅ Row Level Security (RLS) activée sur toutes les tables
✅ Les utilisateurs ne peuvent voir QUE leurs propres données
✅ Authentification Pi Network requise
✅ Toutes les données sont chiffrées au repos
✅ Connexions SSL/TLS obligatoires

## Prochaines Étapes

Après avoir configuré Supabase, les données seront **persistantes** et **sécurisées**:
- ✅ Les transactions sont sauvegardées
- ✅ Les cartes virtuelles sont stockées
- ✅ Les objectifs d'épargne sont persistants
- ✅ L'historique est conservé
- ✅ Tout fonctionne même après refresh de la page

## Support

Si vous rencontrez des problèmes:
1. Vérifiez les logs dans Supabase → `Logs`
2. Vérifiez les variables d'environnement Vercel
3. Testez la connexion dans `/api/test-db`
