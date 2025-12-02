# Configuration Resend pour le formulaire de contact

## Étapes pour configurer Resend

1. **Créer un compte Resend**
   - Aller sur https://resend.com
   - Créer un compte gratuit (100 emails/jour)

2. **Obtenir la clé API**
   - Aller sur https://resend.com/api-keys
   - Cliquer sur "Create API Key"
   - Copier la clé générée

3. **Configurer la clé dans le projet**
   - Ouvrir le fichier `.env.local`
   - Remplacer `your_resend_api_key_here` par votre vraie clé API
   - Exemple: `RESEND_API_KEY=re_123456789`

4. **Configuration du domaine (optionnel mais recommandé)**
   - Par défaut, les emails sont envoyés depuis `onboarding@resend.dev`
   - Pour utiliser votre propre domaine:
     - Aller sur https://resend.com/domains
     - Ajouter votre domaine (ex: `anquetil.org`)
     - Suivre les instructions pour configurer les DNS
     - Modifier `app/api/contact/route.ts` ligne 19:
       ```typescript
       from: 'Portfolio <contact@anquetil.org>',
       ```

5. **Tester le formulaire**
   - Redémarrer le serveur de développement: `npm run dev`
   - Aller sur http://localhost:3000
   - Cliquer sur "Me contacter"
   - Remplir le formulaire et envoyer
   - Vérifier la réception de l'email sur julien@anquetil.org

## Notes importantes

- Le fichier `.env.local` est dans `.gitignore` et ne sera pas commité
- En production (Vercel), ajouter `RESEND_API_KEY` dans les variables d'environnement
- Le plan gratuit Resend permet 100 emails/jour et 3000 emails/mois
