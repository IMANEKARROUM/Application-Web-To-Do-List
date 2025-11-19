1.GET vs POST : GET envoie les données dans l’URL (visible, limité), POST les envoie dans le corps de la requête (plus discret, plus sûr pour des infos sensibles).

2.redirect(url_for(...)) : permet de renvoyer l’utilisateur vers une autre route après une action, évitant le renvoi d’un formulaire en double et gardant un flux propre.

3.Blocs et héritage Jinja : on définit une base avec des blocs modifiables ; les templates enfants héritent de cette base et remplissent/écrasent ces blocs pour éviter les répétitions.

4.Exemple JS client : validation instantanée d’un formulaire (format email, longueur, etc.) pour offrir un retour immédiat sans requête serveur.