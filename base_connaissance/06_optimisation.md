# Problèmes d'optimisation
*Source : document_25077 (15).pdf — mathinfo.tn*

## Introduction aux problèmes d'optimisation — structure « Tant que »

### Exemple 1 : Recherche du maximum d'un tableau
**Énoncé :** On considère un tableau T de n entiers (n ≥ 1). Déterminer la valeur maximale contenue dans ce tableau, ainsi que l'indice où elle se trouve.
Exemple : T = [12, 45, 7, 89, 23, 56] → maximum = 89, indice 3.

**Travail demandé :**
- Proposer un algorithme trouvant le maximum, en utilisant une structure itérative "Tant que".
- Traduire en Python, tester sur T = [12, 45, 7, 89, 23, 56].
- Bonus : afficher aussi l'indice du maximum.

### Exemple 2 : Écart minimal entre deux valeurs successives
**Énoncé :** Tableau T de n entiers (n ≥ 2). Déterminer l'écart minimal entre deux éléments successifs, c.-à-d. le plus petit |T[i+1]-T[i]| pour i de 0 à n-2.
Exemple : T = [12, 45, 7, 89, 23, 56] → écarts : 33, 38, 82, 66, 33 → écart minimal = 33 (indices 0 et 1).

**Travail demandé :** idem (algorithme "Tant que", traduction Python, test, bonus indices).

### Remarque pédagogique
Un problème d'optimisation cherche, parmi un ensemble de valeurs, celle qui optimise (maximise ou minimise) un critère donné. Structure de base commune :
1. Initialiser une valeur de référence (souvent le premier élément).
2. Parcourir les autres éléments à l'aide d'un compteur.
3. Mettre à jour la référence dès qu'on trouve « mieux ».

---

## Problèmes d'optimisation (balayage / variation d'un pas)

**Objectif :** distinguer deux familles classiques de problèmes algorithmiques traités par balayage (variation d'un pas), à partir d'exemples concrets.

### 1) Le problème d'optimisation — définition
Un problème d'optimisation consiste à rechercher, parmi toutes les valeurs possibles d'une variable, celle qui rend une grandeur (aire, volume, surface, coût, distance...) minimale ou maximale (un extremum). Il n'existe pas de valeur cible fixée à l'avance : on parcourt tout le domaine possible et on conserve, au fur et à mesure, la meilleure valeur rencontrée.
- On cherche un minimum ou un maximum.
- L'algorithme conserve la meilleure valeur trouvée jusque-là (comparaison au meilleur actuel).
- Le résultat ne dépend d'aucune valeur cible externe : il ne dépend que de la fonction elle-même.

### EXERCICE 1 — Surface colorée entre trois disques
Un disque de rayon R = 5 cm est tangent intérieurement à deux disques, disque 1 (rayon R1) et disque 2 (rayon R2), eux-mêmes tangents entre eux. Les trois centres sont alignés.
1. Exprimer la surface colorée (surface du grand disque diminuée des surfaces des deux disques intérieurs) en fonction de R1.
2. Écrire l'algorithme d'une fonction `Surface(R1 : réel)` qui calcule cette surface colorée.
3. Écrire l'algorithme d'une fonction `approche_max()` qui détermine une valeur approchée de R1 pour laquelle cette surface est maximale.

### EXERCICE 2 — Rectangle inscrit dans un cercle
Soit C un cercle de rayon r = 2 cm. On construit un rectangle ABCD inscrit dans ce cercle, de longueur x et de largeur y (r étant la moitié de la diagonale du rectangle).
On donne : `y = √(4r² - x²)` et `périmètre = 2*(x + y)`.
1. Déterminer le périmètre P du rectangle en fonction de x et de r.
2. Écrire un programme Python qui calcule les dimensions du rectangle pour que son périmètre soit égal à 5 cm.

### EXERCICE 3 — Surface minimale d'un cylindre (MIN_SURF)
On veut fabriquer une boîte cylindrique fermée de volume V donné, en utilisant le minimum de métal possible. Si r est le rayon et h la hauteur, avec V = π×r²×h fixé, la surface totale s'écrit :
`S(r) = 2πr² + 2V/r`
On ne cherche pas une surface proche d'une valeur donnée : on cherche la plus petite surface possible, quelle que soit sa valeur numérique. C'est un problème d'optimisation.
1. Développer l'algorithme du programme MIN_SURF ainsi que les différents modules envisagés.
2. Implémenter la solution Python de ce problème.

### EXERCICE 4 — Rectangle inscrit dans un triangle — approximation
Le triangle ABC est rectangle en A, avec AB = 3 cm et AC = 2 cm. Le point M appartient à [AB] avec AM = x. Le quadrilatère AMNP est un rectangle (MN ∥ AC et NP ∥ AB), et son aire est donnée par :
`A(x) = -2/3 x² + 2x`, x ∈ [0 ; 3]
On cherche la (ou les) valeur(s) de x pour lesquelles cette aire est très proche de 1 cm², en procédant par balayage (incrémentation progressive de x avec un pas donné).
Principe de l'algorithme CHERCHER(pas) : on part de x = 0 et on augmente x par pas successifs de valeur « pas » ; à chaque étape on calcule l'aire A(x). Comme A est croissante sur [0 ; 1,5] (sommet de la parabole en x = 1,5, où A = 1,5), l'aire finit par atteindre ou dépasser 1. On s'arrête alors et on retourne la valeur de x obtenue, valeur approchée de la solution. Une condition de sécurité x < 3 empêche toute boucle infinie.
1. Écrire l'algorithme de la fonction CHERCHER(pas).
2. Implémenter la solution Python.

### EXERCICE 5 — Surface maximale d'un enclos rectangulaire (MAX_SURF)
Un agriculteur dispose d'une longueur fixe de grillage (ex. 20 m) pour clôturer un terrain rectangulaire de longueur x et largeur y. Il cherche les dimensions donnant le plus grand terrain possible avec cette longueur de grillage.
`Périmètre : P = 2x + 2y`    `Surface : A = x·y`
En exprimant y en fonction de x à partir du périmètre fixé L, on obtient : `A(x) = x · (L/2 - x)`, x ∈ ]0 ; L/2[
1. Développer l'algorithme du programme MAX_SURF ainsi que les différents modules envisagés.
2. Implémenter la solution Python.

### EXERCICE 6 — Boîte parallélépipédique à partir d'une feuille carrée
Dans une feuille de carton carrée de 10 cm de côté, on découpe aux quatre coins quatre carrés de côté x de telle façon qu'en relevant les quatre bords restants, on obtient une boîte de forme parallélépipédique. On veut trouver la valeur de x telle que le volume de la boîte ainsi formée soit maximum.
*Rappel : V = surface de base × hauteur*

**Questions :**
1. Montrer que le volume de la boîte en fonction de x s'écrit : `V(x) = x × (10 - 2x)²`
2. Écrire l'algorithme de la fonction `Valeur(pas)` permettant de déterminer la valeur de x pour que le volume V de la boîte soit maximal. Le pas de variation (pas) de x est déjà saisi auparavant (0 < pas < 1).

### EXERCICE 7 — Problème d'optimisation : Stade (piste d'athlétisme et terrain de football)
Une association sportive veut construire un stade formé d'une piste d'athlétisme entourant un terrain de football rectangulaire, tout en cherchant à maximiser la surface de ce dernier.
Le terrain de football est un rectangle de longueur L, de largeur D et de surface S.
La piste d'athlétisme est de longueur P et formée par les deux arêtes parallèles du terrain de football (de longueur 2*L) et les deux demi-cercles de diamètre D (de longueur π*D).

**Relations données :**
- S = L * D
- P = 2 * L + π * D
- d'où : `S = L * (P - 2*L) / π`

**Travail demandé :** étant donné que L varie de 0 à P/2, écrire un algorithme d'une fonction qui permet de déterminer, à ε près, la longueur optimale Lopt correspondant à la surface maximale Smax du terrain, sachant que ε et P sont déjà saisis dans l'algorithme du programme principal.

### EXERCICE 7 (bis) — Surface minimale d'une boîte parallélépipédique (MIN_SURF_BOITE)
Une entreprise fabrique des boîtes de rangement en forme de parallélépipède rectangle à base carrée, sans couvercle, de volume V donné en cm³ (200 ≤ V ≤ 8000). Il faut déterminer le côté de la base c et la hauteur h qui permettent de consommer le moins de métal possible.
`Surface : S = c² + 4ch`    `Volume : V = c² × h`
Exemple : pour V = 500 cm³, la surface minimale utilisée est 300 cm², avec h = 5 cm et c = 10 cm.

**Travail demandé :**
1. Déterminer h en fonction de c.
2. Déterminer la fonction numérique S(c) représentant la surface de la boîte en fonction du côté (c ∈ ]0 ; 30]).
3. Développer l'algorithme du programme MIN_SURF_BOITE ainsi que les différents modules envisagés.
4. Implémenter la solution Python de ce problème.
