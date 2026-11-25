# Les tableaux à deux dimensions (Matrices)
*Sources : document_25077 (6).pdf (extrait, page 8/24 d'un support "Conventions Algorithmiques & Implémentation en Python 2021-2022"), document_25077 (7).pdf (cours complet 3SI — Cours, Algorithmes, Python, Exercices corrigés, QCM), document_25077 (8).pdf (exercices corrigés 3SI), document_25077 (9).pdf ("Matrice : Série 2" — 6 exercices corrigés)*

## I. Cours — Notion de tableau 2D (matrice)

### 1. Définition
Un tableau à deux dimensions (ou **matrice**) est une structure de données qui permet de stocker des éléments organisés en **lignes** et en **colonnes**.

**Notation :** `Nom_Matrice[Ligne, Colonne]` désigne l'élément à la ligne i et colonne j.
**Remarque :** Les indices débutent à **Zéro** par défaut.

**Exemple — Matrice 3×4 :**
```
      [0] [1] [2] [3]
[0]    12   5   8   3
[1]     7  14   2   9
[2]     6  11   4   1
```
→ T[0,0] = 12   T[1,2] = 2   T[2,3] = 1

### 2. Déclaration en algorithme

**1ère méthode (Tableau de Déclaration des Objets — T.D.O) :**
| Objet | Type / Nature |
|---|---|
| Nom_Matrice | Tableau de N Lignes * M Colonnes Type_élément |

**2ème méthode (Tableau de Déclaration des Nouveaux Types — T.D.N.T, puis T.D.O) :**
```
Tableau de Déclaration des Nouveaux Types (T.D.N.T)
Nom_Type_Matrice = Tableau de N Lignes * M Colonnes Type_élément
```
| Objet | Type/Nature |
|---|---|
| Nom_Matrice | Nom_Type_Matrice |

### 3. Déclaration en Python

**Avec `from numpy import *` :**
```python
from numpy import *
Nom_Matrice = array( [ [Type_élément()] * M ] * N )
```

**Avec `import numpy as np` :**
```python
import numpy as np
Nom_Matrice = np.array( [ [Type_élément()] * M ] * N )
```
*(N = nombre de lignes, M = nombre de colonnes. Il est obligatoire d'importer la bibliothèque Numpy. Les éléments d'une matrice doivent être de même type.)*

**Exemples de déclarations :**
```python
# Matrice M de 6 lignes et 5 colonnes d'entiers :
from numpy import *
M = array( [ [int()] * 5 ] * 6 )

# Matrice de réels (3 lignes, 4 colonnes) :
T = array( [ [float()] * 4 ] * 3 )

# Matrice de chaînes de caractères (2 lignes, 3 colonnes) :
# Méthode 1 : ajouter dtype=object
S1 = array( [ [str()] * 3 ] * 2, dtype=object )
# Méthode 2 : supprimer les parenthèses après str
S2 = array( [ [str] * 3 ] * 2, dtype=object )
```

**Initialisation avec une valeur spécifique :**
```python
# Syntaxe générale :
Nom_Matrice = array( [ [valeur_initiale] * M ] * N , Type_élément )

# Exemple : matrice 3×4 initialisée à 0
T = array( [ [0] * 4 ] * 3 , int )

# Exemple : matrice 2×3 initialisée à 1.0
T = array( [ [1.0] * 3 ] * 2 , float )
```

**N.B. (document 6) :**
- Il est obligatoire d'importer la bibliothèque Numpy de Python.
- Les éléments d'une matrice doivent être de **même type**.
- En algorithmique, les indices des éléments d'une matrice sont de **type scalaire**.
- Les indices de la 1ère ligne et de la 1ère colonne d'une matrice sont, **par défaut**, égaux à **Zéro**.
- Pour accéder à un élément d'une matrice : **Nom_Matrice[Ligne, Colonne]**

### 4. Parcours d'une matrice
| Algorithme | Python (`from numpy import *`) |
|---|---|
```
Pour i de 0 à n-1 faire
    Pour j de 0 à m-1 faire
        Traiter T[i,j]
    FinPour
FinPour
```
```python
from numpy import *
for i in range(n):
    for j in range(m):
        # Traiter T[i,j]
```

### 5. Saisie et affichage

**a) Saisie — Algorithme**
```
Procédure Saisir_Matrice(T, n, m)
Debut
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            Écrire("T[", i, ",", j, "] = ")
            Lire(T[i,j])
        FinPour
    FinPour
Fin
```
Déclaration (T.D.O) : `i, j` (Entier)

**b) Affichage — Algorithme**
```
Procédure Afficher_Matrice(T, n, m)
Debut
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            Écrire(T[i,j])
        FinPour
    FinPour
Fin
```
Déclaration (T.D.O) : `i, j` (Entier)

**c) Saisie — Python**
```python
def saisir_matrice(n, m):
    T = array( [[int()] * m] * n )
    for i in range(n):
        for j in range(m):
            T[i,j] = int(input("T["+str(i)+ ","+str(j)+ "] = "))
    return T
```

**d) Affichage — Python**
```python
def afficher_matrice(T, n, m):
    for i in range(n):
        for j in range(m):
            print(T[i,j], end='\t')
        print()
```

## II. Algorithmes de base sur les matrices

### 1. Somme des éléments
```
Fonction Somme_Matrice(T, n, m) : Réel
Debut
    S ← 0
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            S ← S + T[i,j]
        FinPour
    FinPour
    Retourner S
Fin
```
Déclaration : `i, j` (Entier), `S` (Réel)

### 2. Maximum
```
Fonction Maximum_Matrice(T, n, m) : Réel
Début
    Max ← T[0,0]
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            Si T[i,j] > Max Alors
                Max ← T[i,j]
            FinSi
        FinPour
    FinPour
    Retourner Max
Fin
```
Déclaration : `i, j` (Entier), `Max` (Réel)

### 3. Somme d'une ligne donnée
```
Fonction Somme_Ligne(T, m, l) : Réel
Début
    S ← 0
    Pour j de 0 à m-1 faire
        S ← S + T[l,j]
    FinPour
    Retourner S
Fin
```

### 4. Somme d'une colonne donnée
```
Fonction Somme_Colonne(T, n, c) : Réel
Début
    S ← 0
    Pour i de 0 à n-1 faire
        S ← S + T[i,c]
    FinPour
    Retourner S
Fin
```

### 5. Diagonale principale (matrice carrée)
```
Fonction Diagonale_Principale(T, n) : Réel
Début
    S ← 0
    Pour i de 0 à n-1 faire
        S ← S + T[i,i]
    FinPour
    Retourner S
Fin
```

### 6. Diagonale secondaire (matrice carrée)
```
Fonction Diagonale_Secondaire(T, n) : Réel
Début
    S ← 0
    Pour i de 0 à n-1 faire
        S ← S + T[i, n-1-i]
    FinPour
    Retourner S
Fin
```

### 7. Symétrie (matrice carrée)
```
Fonction Est_Symetrique(T, n) : Booléen
Début
    Pour i de 0 à n-1 faire
        Pour j de 0 à n-1 faire
            Si T[i,j] ≠ T[j,i] Alors
                Retourner FAUX
            FinSi
        FinPour
    FinPour
    Retourner VRAI
Fin
```

## III. Implémentation complète en Python (`from numpy import *`)

```python
# Module Matrice
from numpy import *

# — Saisie
def saisir_matrice(n, m):
    T = array( [[int()] * m] * n )
    for i in range(n):
        for j in range(m):
            T[i,j] = int(input("T["+str(i)+ ","+str(j)+ "] = "))
    return T

# — Affichage
def afficher_matrice(T, n, m):
    for i in range(n):
        for j in range(m):
            print("T[",i, ",",j,"]", end="")
        print()

# — Somme totale
def somme_matrice(T, n, m):
    S = 0
    for i in range(n):
        for j in range(m):
            S = S + T[i,j]
    return S

# — Maximum
def max_matrice(T, n, m):
    Max = T[0,0]
    for i in range(n):
        for j in range(m):
            if T[i,j] > Max:
                Max = T[i,j]
    return Max

# — Minimum
def min_matrice(T, n, m):
    Min = T[0,0]
    for i in range(n):
        for j in range(m):
            if T[i,j] < Min:
                Min = T[i,j]
    return Min

# — Somme d'une ligne
def somme_ligne(T, m, l):
    S = 0
    for j in range(m):
        S = S + T[l,j]
    return S

# — Somme d'une colonne
def somme_colonne(T, n, c):
    S = 0
    for i in range(n):
        S = S + T[i,c]
    return S

# — Diagonale principale
def diagonale_principale(T, n):
    S = 0
    for i in range(n):
        S = S + T[i,i]
    return S

# — Diagonale secondaire
def diagonale_secondaire(T, n):
    S = 0
    for i in range(n):
        S = S + T[i, n-1-i]
    return S

# — Transposée
def transposee(T, n, m):
    T_prime = array( [[int()] * n] * m )
    for i in range(n):
        for j in range(m):
            T_prime[j,i] = T[i,j]
    return T_prime

# — Symétrie
def est_symetrique(T, n):
    for i in range(n):
        for j in range(n):
            if T[i,j] != T[j,i]:
                return False
    return True

# — Recherche
def rechercher(T, n, m, val):
    for i in range(n):
        for j in range(m):
            if T[i,j] == val:
                return (i, j)
    return (-1, -1)

# — Programme Principal
n = int(input('Nombre de lignes  : '))
m = int(input('Nombre de colonnes : '))
T = saisir_matrice(n, m)
print('\nLa matrice :')
afficher_matrice(T, n, m)
print("Somme   = ", somme_matrice(T, n, m))
print("Maximum = ", max_matrice(T, n, m))
print("Minimum = ", min_matrice(T, n, m))
```

## IV. Exercices corrigés (document 7)

### Exercice 1 — Moyenne par ligne
Écrire un algorithme et sa traduction en Python qui calcule et affiche la moyenne de chaque ligne d'une matrice de réels T de n lignes et m colonnes.

**Correction — Algorithme :**
```
Procédure Moyennes_Lignes(T, n, m)
Debut
    Pour i de 0 à n-1 faire
        S ← 0
        Pour j de 0 à m-1 faire
            S ← S + T[i,j]
        FinPour
        Écrire("Moyenne ligne ", i, " = ", S / m)
    FinPour
Fin
```
Déclaration : `i, j` (Entier), `S` (Réel)

**Python :**
```python
from numpy import *

def moyennes_lignes(T, n, m):
    for i in range(n):
        S = 0
        for j in range(m):
            S = S + T[i,j]
        print("Moyenne ligne", i, "=",S / m)

# — Test —
n, m = 3, 3
T = array( [[10, 12, 8], [15, 7, 14], [9, 11, 13]] )
moyennes_lignes(T, n, m)
# Moyenne ligne 0 = 10.00
# Moyenne ligne 1 = 12.00
# Moyenne ligne 2 = 11.00
```

### Exercice 2 — Compter les éléments négatifs
Écrire une fonction (algorithme et Python) qui retourne le nombre d'éléments négatifs dans une matrice d'entiers T de n lignes et m colonnes.

**Correction — Algorithme :**
```
Fonction Compter_Negatifs(T, n, m) : Entier
Début
    cpt ← 0
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            Si T[i,j] < 0 Alors
                cpt ← cpt + 1
            FinSi
        FinPour
    FinPour
    Retourner cpt
Fin
```
Déclaration : `i, j, cpt` (Entier)

**Python :**
```python
from numpy import *

def compter_negatifs(T, n, m):
    cpt = 0
    for i in range(n):
        for j in range(m):
            if T[i,j] < 0:
                cpt = cpt + 1
    return cpt

# — Test —
n, m = 3, 3
T = array( [[-3, 5, -1], [0, -7, 2], [4, -8, 6]] )
print(compter_negatifs(T, n, m))  # Affiche 4
```

### Exercice 3 — Matrice des carrés
Écrire une fonction qui reçoit une matrice T (n lignes, m colonnes) et retourne une nouvelle matrice TC où chaque élément est le carré de l'élément correspondant.

**Correction — Algorithme :**
```
Fonction Matrice_Carres(T, n, m) :Matrice
Début
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            TC[i,j] ← T[i,j] * T[i,j]
        FinPour
    FinPour
    Retourner TC
FinFonction
```
Déclaration : `TC` (Matrice de N Lignes * M Colonnes Entier), `i, j` (Entier)

**Python :**
```python
from numpy import *

def matrice_carres(T, n, m):
    TC = array( [[int()] * m] * n )
    for i in range(n):
        for j in range(m):
            TC[i,j] = T[i,j] * T[i,j]
    return TC

# — Test —
n, m = 2, 3
T = array( [[1, 2, 3], [4, 5, 6]] )
TC = matrice_carres(T, n, m)
afficher_matrice(TC, n, m)
#  1  4  9
# 16 25 36
```

### Exercice 5 — Matrice magique
Une matrice carrée est dite « magique » si la somme de chaque ligne, de chaque colonne et des deux diagonales sont toutes égales. Écrire une fonction `Est_Magique(T, n)` qui retourne Vrai si T est magique, Faux sinon.

Exemple (somme = 15 partout) :
```
2 7 6
9 5 1
4 3 8
```
(diag. principale 2+5+8=15, diag. secondaire 6+5+4=15)

**Correction — Algorithme :**
```
Fonction Est_Magique(T, n) : Booléen
Début
    {Somme de référence = somme de la 1ère ligne}
    ref ← 0
    Pour j de 0 à n-1 faire
        ref ← ref + T[0,j]
    FinPour
    {Vérifier les lignes}
    Pour i de 0 à n-1 faire
        S ← 0
        Pour j de 0 à n-1 faire
            S ← S + T[i,j]
        FinPour
        Si S ≠ ref Alors Retourner FAUX FinSi
    FinPour
    {Vérifier les colonnes}
    Pour j de 0 à n-1 faire
        S ← 0
        Pour i de 0 à n-1 faire
            S ← S + T[i,j]
        FinPour
        Si S ≠ ref Alors Retourner FAUX FinSi
    FinPour
    {Diagonale principale}
    S ← 0
    Pour i de 0 à n-1 faire
        S ← S + T[i,i]
    FinPour
    Si S ≠ ref Alors Retourner FAUX FinSi
    {Diagonale secondaire}
    S ← 0
    Pour i de 0 à n-1 faire
        S ← S + T[i, n-1-i]
    FinPour
    Si S ≠ ref Alors Retourner FAUX FinSi
    Retourner VRAI
FinFonction
```
Déclaration : `n, i, j` (Entier), `ref, S` (Réel)

**Python :**
```python
from numpy import *

def est_magique(T, n):
    # Somme de référence (1ère ligne)
    ref = 0
    for j in range(n):
        ref = ref + T[0,j]
    # Vérification des lignes
    for i in range(n):
        S = 0
        for j in range(n):
            S = S + T[i,j]
        if S != ref:
            return False
    # Vérification des colonnes
    for j in range(n):
        S = 0
        for i in range(n):
            S = S + T[i,j]
        if S != ref:
            return False
    # Diagonale principale
    S = 0
    for i in range(n):
        S = S + T[i,i]
    if S != ref:
        return False
    # Diagonale secondaire
    S = 0
    for i in range(n):
        S = S + T[i, n-1-i]
    if S != ref:
        return False
    return True

# — Test —
n = 3
T = array( [[2, 7, 6], [9, 5, 1], [4, 3, 8]] )
print(est_magique(T, n))  # True  (somme magique = 15)
```

### QCM — 15 questions avec corrections (document 7)

| # | Question | Bonne réponse | Explication |
|---|---|---|---|
| 1 | Comment déclarer une matrice de 3 lignes et 4 colonnes d'entiers en Python ? | `T = array([[int()]*4]*3)` | Avec `from numpy import *` : `array([[Type_élément()]*M]*N)`. Ici int(), M=4, N=3. |
| 2 | Comment accéder à l'élément de la 2ème ligne et 3ème colonne d'une matrice T ? | `T[1,2]` | Indices débutent à 0 : 2ème ligne = indice 1, 3ème colonne = indice 2. |
| 3 | Combien de boucles imbriquées pour parcourir tous les éléments d'une matrice n×m ? | 2 boucles | i pour les lignes (0 à n-1), j pour les colonnes (0 à m-1). |
| 4 | Notation correcte du message de saisie pour T[i,j] ? | `Écrire("T[",i,",",j,"] = ")` | Notation officielle : T[Ligne, Colonne] avec virgule. |
| 5 | Élément de la diagonale secondaire à la position i dans une matrice n×n ? | `T[i, n-1-i]` | La somme des indices vaut toujours n-1. |
| 6 | Dans T = array([[1,2],[3,4]]), valeur de T[1,0] ? | 3 | T[1,0] → ligne 1 = [3,4], colonne 0 → valeur 3. |
| 7 | Comment calculer la somme de tous les éléments d'une matrice T (n lignes, m colonnes) ? | `S=0; for i in range(n): for j in range(m): S=S+T[i,j]` | 2 boucles imbriquées avec T[i,j] ; `sum()`/`np.sum()` non conformes au programme. |
| 8 | Élément de la diagonale principale pour i=2 dans une matrice 4×4 ? | `T[2,2]` | Diagonale principale = T[i,i]. |
| 9 | Comment déclarer une matrice de chaînes (2 lignes, 3 colonnes) ? | `T = array([[str]*3]*2, dtype=object)` | Supprimer les parenthèses après str ou ajouter dtype=object. |
| 10 | Sortie de `T=array([[1,2],[3,4]]); print(T[0,1]+T[1,0])` ? | 5 | T[0,1]=2, T[1,0]=3 → 2+3=5. |
| 11 | Une matrice carrée T est symétrique si … | `T[i,j] = T[j,i]` | Symétrie par rapport à la diagonale principale. |
| 12 | Syntaxe Python qui initialise une matrice n×m à la valeur 5 (entiers) ? | `T = array([[5]*m]*n, int)` | Conventions officielles : `array([[valeur_initiale]*M]*N, Type_élément)`. |
| 13 | Dans la 2ème méthode, que définit le T.D.N.T ? | Un nouveau type réutilisable | ex: MatriceEntier = Tableau de N Lig * M Col Entier, réutilisable dans le T.D.O. |
| 14 | Dans quelle situation utilise-t-on une matrice plutôt qu'un tableau 1D ? | Données organisées en lignes et colonnes | notes, grilles, images, etc. |
| 15 | Bonne façon de rechercher val dans une matrice T (n lignes, m colonnes) ? | `for i in range(n): for j in range(m): if T[i,j]==val: return(i,j)` | 2 boucles imbriquées, comparaison T[i,j]==val. |

### Récapitulatif — à retenir

| Concept | Python / Algorithme |
|---|---|
| Déclaration (entiers, n×m) | `T = array( [[int()] * m] * n )` |
| Déclaration (réels) | `T = array( [[float()] * m] * n )` |
| Déclaration (chaînes) | `T = array( [[str] * m] * n, dtype=object )` |
| Initialisation à val | `T = array( [[val] * m] * n, type )` |
| Accès à un élément | `T[i, j]` (indices 0 à n-1, 0 à m-1) |
| Dimensions | toujours passées en paramètre : n, m |
| Parcours complet | `for i in range(n): for j in range(m): ...` |
| Somme totale | `S=0; for i in range(n): for j in range(m): S=S+T[i,j]` |
| Diagonale principale | `for i in range(n): S = S + T[i,i]` |
| Diagonale secondaire | `for i in range(n): S = S + T[i, n-1-i]` |
| Import NumPy | `from numpy import *` (pas de préfixe np.) |
| Déclaration algo (1ère) | TDO : Nom &#124; Tableau de N Lignes * M Colonnes Type |
| Déclaration algo (2ème) | TDNT : NomType = Tableau... puis TDO : Nom &#124; NomType |

## V. Exercices corrigés (document 8)

### Rappel des conventions (document 8)
```
Déclaration algorithmique (T.D.O) :
Objet       | Type
Nom_Matrice | Tableau de N Lignes * M Colonnes  Type_élément

Déclaration Python (bibliothèque Numpy) :
from numpy import *
Nom_Matrice = array([[Type_élément()] * M] * N)
# Ou bien :
import numpy as np
Nom_Matrice = np.array([[Type_élément()] * M] * N)

Accès à un élément :
Algorithmique : Nom_Matrice[Ligne, Colonne]
Python        : Nom_Matrice[Ligne, Colonne]    (avec numpy)
```

### Exercice 1 — Maximum et sa position
On dispose d'une matrice T de n lignes et m colonnes contenant des entiers.

**Travail demandé :**
1. Écrire un algorithme (fonction) qui retourne la valeur maximale de la matrice.
2. Modifier cet algorithme pour retourner également la position (ligne, colonne) du maximum.
3. Traduire en Python (avec Numpy).

Exemple : matrice avec maximum 18 en position (1, 1).

**Correction — Algorithme (Partie 1, valeur max seulement) :**
```
Fonction Max_Matrice(T : matrice; n, m : Entier) : Entier
Début
    max_val ← T[0, 0]
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            Si T[i, j] > max_val Alors
                max_val ← T[i, j]
            FinSi
        FinPour
    FinPour
    Retourner max_val
Fin
```
Déclaration : `max_val` (Entier), `i, j` (Entier)

**Algorithme (Partie 2, max + position) :**
```
Procédure Max_Position(T : Tableau N*M Entier ; n,Entier ; @max_val @lig,@col :Entier) ;
Debut
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            Si T[i, j] > max_val Alors
                max_val ← T[i, j]
                lig ← i  ;  col ← j
            FinSi
        FinPour
    FinPour
Fin
```

**Python (Numpy) :**
```python
import numpy as np

def max_position(T, n, m):
    global max_val, lig, col
    for i in range(n):
        for j in range(m):
            if T[i, j] > max_val:
                max_val = T[i, j]
                lig = i
                col = j

# Déclaration et test
n, m = 3, 3
T = np.array([[int()]*m]*n)
T[0,0]=5 ; T[0,1]=12 ; T[0,2]=3
T[1,0]=8 ; T[1,1]=18 ; T[1,2]=6
T[2,0]=14; T[2,1]=2  ; T[2,2]=9
max_val = T[0, 0]
lig, col = 0, 0
max_position(T, n, m)
print("Max =", max_val," en position (",lig,",",col,")")
 # Max = 18 en position (1, 1)
```

### Exercice 2 — Sommes par ligne et par colonne — Notes d'élèves
On dispose d'une matrice T de n lignes et m colonnes représentant les notes (sur 20) de n élèves dans m matières.

**Travail demandé :**
1. Écrire une fonction `Somme_Ligne(T, i, m)` qui retourne la somme des notes de l'élève i.
2. Écrire une fonction `Somme_Col(T, n, j)` qui retourne la somme des notes en matière j.
3. Écrire une procédure qui affiche pour chaque élève sa moyenne.
4. Écrire une fonction qui retourne l'indice de l'élève ayant la meilleure moyenne.
5. Traduire toutes les fonctions en Python (Numpy).

Exemple — matrice des notes (4 élèves × 3 matières) : Maths/Physique/Info. Élève 0: 14,12,16 ; Élève 1: 10,18,11 ; Élève 2: 15,13,17 ; Élève 3: 9,8,12.
→ Meilleur élève : Élève 2 avec moyenne 15.00.

**Correction — Algorithme :**
```
Fonction Somme_Ligne(T : Tableau N*M Réel ; i, m : Entier) : Réel
Debut
    S ← 0
    Pour j de 0 à m-1 faire
        S ← S + T[i, j]
    FinPour
    Retourner S
Fin

Fonction Somme_Col(T : Tableau N*M Réel ; n, j : Entier) : Réel
    Debut
    S ← 0
    Pour i de 0 à n-1 faire
        S ← S + T[i, j]
    FinPour
    Retourner S
Fin

Procédure Afficher_Moyennes(T : Tableau N*M Réel ; n, m : Entier)
Début
    Pour i de 0 à n-1 faire
        Écrire("Élève ", i, " : moyenne = ", Somme_Ligne(T,i,m) / m)
    FinPour
Fin

Fonction Meilleur_Eleve(T : Tableau N*M Réel ; n, m : Entier) : Entier
Debut
    moy_max ← Somme_Ligne(T, 0, m) / m
    indice  ← 0
    Pour i de 1 à n-1 faire
        Si Somme_Ligne(T,i,m)/m > moy_max Alors
            moy_max ← Somme_Ligne(T,i,m)/m
            indice  ← i
        FinSi
    FinPour
    Retourner indice
Fin
```

**Python (Numpy) :**
```python
import numpy as np

def somme_ligne(T, i, m):
    S = 0
    for j in range(m):
        S = S + T[i, j]
    return S

def somme_col(T, n, j):
    S = 0
    for i in range(n):
        S = S + T[i, j]
    return S

def afficher_moyennes(T, n, m):
    for i in range(n):
        print("Élève ",i," : moyenne =", somme_ligne(T,i,m)/m)

def meilleur_eleve(T, n, m):
    moy_max = somme_ligne(T, 0, m) / m
    indice = 0
    for i in range(1, n):
        if somme_ligne(T, i, m) / m > moy_max:
            moy_max = somme_ligne(T, i, m) / m
            indice = i
    return indice

# Déclaration Numpy
n, m = 4, 3
T = np.array([[float()]*m]*n)
donnees = [[14,12,16],[10,18,11],[15,13,17],[9,8,12]]
for i in range(n):
    for j in range(m):
        T[i, j] = donnees[i][j]
afficher_moyennes(T, n, m)
print("Meilleur élève : indice", meilleur_eleve(T, n, m))  # 2
```

### Exercice 3 — Tri à bulles d'une ligne de matrice
On dispose d'une matrice T d'entiers de n lignes et m colonnes.

**Travail demandé :**
1. Écrire une procédure `Tri_Bulles_Ligne(T, i, m)` qui trie dans l'ordre croissant la ligne i, en utilisant le tri à bulles.
2. Écrire une procédure `Tri_Toutes_Lignes(T, n, m)` qui trie toutes les lignes de la matrice.
3. Traduire en Python (Numpy).

Exemple : [[5,12,3,8],[7,1,14,6],[11,9,2,15]] → [[3,5,8,12],[1,6,7,14],[2,9,11,15]]

**Correction — Algorithme :**
```
Procédure Tri_Bulles_Ligne(T : Tableau N*M Entier ; i, m : Entier)
debut
    Pour k de 0 à m-2 faire
        Pour j de 0 à m-2-k faire
            Si T[i, j] > T[i, j+1] Alors
                tmp      ← T[i, j]
                T[i, j]  ← T[i, j+1]
                T[i, j+1]← tmp
            FinSi
        FinPour
    FinPour
Fin

Procédure Tri_Toutes_Lignes(T : Tableau N*M Entier ; n, m : Entier)
Debut
    Pour i de 0 à n-1 faire
        Tri_Bulles_Ligne(T, i, m)
    FinPour
Fin
```
Déclaration : `i, j, k` (Entier), `tmp` (Entier)

**Python (Numpy) :**
```python
import numpy as np

def tri_bulles_ligne(T, i, m):
    for k in range(m - 1):
        for j in range(m - 1 - k):
            if T[i, j] > T[i, j+1]:
                T[i, j]  = T[i, j+1]
                T[i, j+1]= T[i, j]

def tri_toutes_lignes(T, n, m):
    for i in range(n):
        tri_bulles_ligne(T, i, m)

# Déclaration Numpy
n, m = 3, 4
T = np.array([[int()]*m]*n)
data = [[5,12,3,8],[7,1,14,6],[11,9,2,15]]
for i in range(n):
    for j in range(m):
        T[i, j] = data[i][j]
tri_toutes_lignes(T, n, m)
for i in range(n):
    for j in range(m):
        print(T[i,j],end="\t")
    print(end="\n")
# [3, 5, 8, 12]  /  [1, 6, 7, 14]  /  [2, 9, 11, 15]
```
> Remarque : dans l'échange ci-dessus tel qu'écrit dans le PDF, `T[i,j+1]` est réaffecté à partir de `T[i,j]` déjà écrasé — l'échange correct nécessite une variable temporaire (`tmp`), comme indiqué dans l'algorithme.

### Exercice 4 — Compter les occurrences — Matrice de fréquences
Un professeur dispose des résultats de 4 élèves à 5 épreuves. Chaque note est un entier entre 0 et 20. On veut construire un tableau `Freq` de taille 21 (indices 0..20) où Freq[k] = nombre d'apparitions de la note k.

**Travail demandé :**
1. Écrire la fonction `Frequences(T, n, m)` qui retourne le tableau Freq.
2. Écrire une procédure `Afficher_Stats(Freq)` qui affiche les notes ayant une fréquence > 0.
3. Écrire une fonction `Note_Plus_Frequente(Freq)` qui retourne la note la plus fréquente.
4. Traduire tout en Python (Numpy).

Exemple : la note 12 apparaît 5 fois → c'est la note la plus fréquente.

**Correction — Algorithme :**
```
Fonction Frequences(T : Tableau N*M Entier ; n, m : Entier) : Tableau
Début
    Pour k de 0 à 20 faire
        Freq[k] ← 0
    FinPour
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            Freq[T[i, j]] ← Freq[T[i, j]] + 1
        FinPour
    FinPour
    Retourner Freq
Fin

Procédure Afficher_Stats(Freq : Tableau[21] Entier)
Début
    Pour k de 0 à 20 faire
        Si Freq[k] > 0 Alors
            Écrire("Note", k, " : ", Freq[k], "fois")
        FinSi
    FinPour
Fin

Fonction Note_Plus_Frequente(Freq : Tableau[21] Entier) : Entier
Début
    max_f ← Freq[0]  ;  note_max ← 0
    Pour k de 1 à 20 faire
        Si Freq[k] > max_f Alors
            max_f ← Freq[k]  ;  note_max ← k
        FinSi
    FinPour
    Retourner note_max
Fin
```
Déclaration : `T` (Tableau de 4 Lignes * 5 Colonnes Entier), `Freq` (Tableau de 21 Entier), `n, m, i, j, k` (Entier), `max_f, note_max` (Entier)

**Python (Numpy) :**
```python
import numpy as np

def frequences(T, n, m):
    freq = [0] * 21
    for i in range(n):
        for j in range(m):
            freq[T[i, j]] += 1
    return freq

def Afficher_Stats(Freq):
    for k in range(21):
        if Freq[k] > 0:
            print("Note", k, ":", Freq[k], "fois")

def Note_Plus_Frequente(Freq):
    max_f = Freq[0]
    note_max = 0
    for k in range(1, 21):
        if Freq[k] > max_f:
            max_f = Freq[k]
            note_max = k
    return note_max

# Déclaration Numpy
n, m = 4, 5
T = np.array([[int()]*m]*n)
data = [[12,15,10,18,12],[14,8,12,16,10],[10,12,18,14,15],[8,16,14,12,10]]
for i in range(n):
    for j in range(m):
        T[i, j] = data[i][j]
freq = frequences(T, n, m)
Afficher_Stats(freq)
print("Note la plus fréquente : ",Note_Plus_Frequente(freq))  # 12
```

### Exercice 5 — Rotation d'une matrice carrée (90° horaire)
On dispose d'une matrice carrée T de taille n×n. On veut créer une nouvelle matrice R correspondant à la rotation de T à 90° dans le sens horaire.

**Règle de rotation 90° horaire :** `R[j, n-1-i] = T[i, j]`

**Travail demandé :**
1. Expliquer la règle de rotation avec un exemple 3×3.
2. Écrire l'algorithme de la fonction `Rotation90(T, n)` qui retourne la matrice R.
3. Traduire en Python (Numpy).

Exemple 3×3 : T = [[1,2,3],[4,5,6],[7,8,9]] → R = [[7,4,1],[8,5,2],[9,6,3]]

**Explication de la règle :**
```
T[0,0]=1 → R[0, 2]=1   (j=0, n-1-i = 3-1-0 = 2) ✓
T[0,2]=3 → R[2, 2]=3   (j=2, n-1-i = 2)          ✓
T[2,0]=7 → R[0, 0]=7   (j=0, n-1-i = 0)          ✓
```

**Algorithme Rotation90 :**
```
Fonction Rotation90(T : Tableau N*N Entier ; n : Entier) : Tableau
Début
    Pour i de 0 à n-1 faire
        Pour j de 0 à n-1 faire
            R[j, n-1-i] ← T[i, j]
        FinPour
    FinPour
    Retourner R
Fin
```
Déclaration : `T, R` (Tableau de N Lignes * N Colonnes Entier), `n, i, j` (Entier)

**Python (Numpy) :**
```python
import numpy as np

def rotation90(T, n):
    R = np.array([[int()]*n]*n)
    for i in range(n):
        for j in range(n):
            R[j, n-1-i] = T[i, j]
    return R

# Test
n = 3
T = np.array([[1,2,3],[4,5,6],[7,8,9]])
print("Rotation 90° :")
R = rotation90(T, n)
for i in range(n):
    for j in range(n):
        print(R[i,j],end="\t")
    print(end="\n")
# [7, 4, 1] / [8, 5, 2] / [9, 6, 3]
```

### Exercice 6 — Matrice identité et multiplication par un scalaire
La matrice identité I de taille n×n est une matrice carrée dont les éléments de la diagonale valent 1 et tous les autres valent 0.

**Travail demandé :**
1. Écrire une fonction `Identite(n)` qui crée et retourne la matrice identité n×n.
2. Écrire une fonction `Mult_Scalaire(T, n, m, k)` qui retourne une nouvelle matrice où chaque élément est multiplié par k.
3. Écrire une fonction `Matrices_Egales(A, B, n, m)` qui retourne VRAI si deux matrices ont mêmes dimensions et mêmes éléments.
4. Traduire tout en Python (Numpy).

Exemple — matrice identité 4×4 : les 1 sont sur la diagonale principale.

**Correction — Algorithme :**
```
Fonction Identite(n : Entier) : Tableau de N Lignes * N Colonnes Entier
Début
    Pour i de 0 à n-1 faire
        Pour j de 0 à n-1 faire
            Si i = j Alors  I[i, j] ← 1
            Sinon           I[i, j] ← 0
            FinSi
        FinPour
    FinPour
    Retourner I
Fin
```
Déclaration : `I` (Tableau de N Lignes * M Colonnes Réel), `i, j` (Entier)

```
Fonction Mult_Scalaire(T : Tableau N*M Réel ; n, m : Entier ; k : Réel) : Tableau de N Lignes * M Colonnes Réel
Début
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            R[i, j] ← T[i, j] * k
        FinPour
    FinPour
    Retourner R
Fin
```
Déclaration : `R` (Tableau de N Lignes * M Colonnes Réel), `i, j` (Entier)

```
Fonction Matrices_Egales(A, B : Tableau N*M Réel ; n, m : Entier) : Booléen
Début
    Pour i de 0 à n-1 faire
        Pour j de 0 à m-1 faire
            Si A[i, j] ≠ B[i, j] Alors  Retourner FAUX
            FinSi
        FinPour
    FinPour
    Retourner VRAI
Fin
```
Déclaration : `i, j` (Entier)

**Python (Numpy) :**
```python
import numpy as np

def identite(n):
    I = np.array([[int()]*n]*n)
    for i in range(n):
        for j in range(n):
            I[i, j] = 1 if i == j else 0
    return I

def mult_scalaire(T, n, m, k):
    R = np.array([[float()]*m]*n)
    for i in range(n):
        for j in range(m):
            R[i, j] = T[i, j] * k
    return R

def matrices_egales(A, B, n, m):
    for i in range(n):
        for j in range(m):
            if A[i, j] != B[i, j]: return False
    return True

n = 4
I = identite(n)
for i in range(n):
    for j in range(n):
        print(I[i,j],end="\t")
    print(end="\n")
# [1,0,0,0] / [0,1,0,0] / [0,0,1,0] / [0,0,0,1]
```

### Exercice 7 — Bordure et intérieur d'une matrice
On dispose d'une matrice carrée T de taille n×n. Bordure = 1ère ligne, dernière ligne, 1ère colonne, dernière colonne. Intérieur = tous les autres éléments.

**Travail demandé :**
1. Écrire une fonction `Somme_Bordure(T, n)` qui calcule la somme des éléments de la bordure.
2. Écrire une fonction `Somme_Interieur(T, n)` qui calcule la somme des éléments intérieurs.
3. Écrire une procédure `Remplir_Bordure(T, n, val)` qui met val sur la bordure et 0 à l'intérieur.
4. Traduire en Python (Numpy).

Exemple — matrice 5×5 (valeurs 1 à 25) : Somme_Bordure = 208, Somme_Interieur = 117.

**Correction — Algorithme :**
```
Fonction Somme_Bordure(T : Tableau N*N Entier ; n : Entier) : Entier
    Variable S : Entier
    S ← 0
    Pour j de 0 à n-1 faire   {1ère et dernière ligne}
        S ← S + T[0, j] + T[n-1, j]
    FinPour
    Pour i de 1 à n-2 faire   {1ère et dernière colonne — sans les coins}
        S ← S + T[i, 0] + T[i, n-1]
    FinPour
    Retourner S
Fin

Fonction Somme_Interieur(T : Tableau N*N Entier ; n : Entier) : Entier
    Variable S : Entier
    S ← 0
    Pour i de 1 à n-2 faire
        Pour j de 1 à n-2 faire
            S ← S + T[i, j]
        FinPour
    FinPour
    Retourner S
Fin

Procédure Remplir_Bordure(T : Tableau N*N Entier ; n, val : Entier)
    Pour i de 0 à n-1 faire
        Pour j de 0 à n-1 faire
            Si i=0 OU i=n-1 OU j=0 OU j=n-1 Alors
                T[i, j] ← val
            Sinon
                T[i, j] ← 0
            FinSi
        FinPour
    FinPour
Fin
```
Déclaration : `i, j` (Entier), `S` (Entier)

> Remarque (du PDF) : dans Somme_Bordure, on parcourt les lignes 0 et n-1 entièrement, puis seulement les lignes 1 à n-2 pour les colonnes 0 et n-1 — pour éviter de compter deux fois les coins de la matrice.

**Python (Numpy) :**
```python
import numpy as np

def somme_bordure(T, n):
    S = 0
    for j in range(n):
        S += T[0, j] + T[n-1, j]
    for i in range(1, n-1):
        S += T[i, 0] + T[i, n-1]
    return S

def somme_interieur(T, n):
    S = 0
    for i in range(1, n-1):
        for j in range(1, n-1):
            S += T[i, j]
    return S

def remplir_bordure(T, n, val):
    for i in range(n):
        for j in range(n):
            if i==0 or i==n-1 or j==0 or j==n-1:
                T[i, j] = val
            else:
                T[i, j] = 0

n = 5
T = np.array([[v+1 for v in range(i*n,i*n+n)] for i in range(n)])
print(somme_bordure(T, n))    # 208
print(somme_interieur(T, n))  # 117
```

### Exercice 8 — Table de Pythagore et recherche dichotomique
La table de Pythagore est une matrice P de taille n×n où `P[i, j] = (i+1) × (j+1)`.

**Travail demandé :**
1. Écrire une fonction `Pythagore(n)` qui crée et retourne cette matrice.
2. Écrire une fonction `Recherche_Ligne(T, i, val, m)` qui recherche val dans la ligne i **par dichotomie** et retourne sa colonne ou -1 si absente.
3. Écrire une fonction `Existe(T, n, val)` qui utilise `Recherche_Ligne` pour savoir si val existe dans toute la matrice.
4. Traduire en Python (Numpy).

Exemple — Table de Pythagore 5×5 : la valeur 12 est présente ; `Recherche_Ligne(P, 2, 12, 5)` retourne la colonne 3. La valeur 7 n'existe pas dans P → `Existe` retourne FAUX.

**Correction — Algorithme :**
```
Fonction Pythagore(n : Entier) : Tableau
Début
    Pour i de 0 à n-1 faire
        Pour j de 0 à n-1 faire
            P[i, j] ← (i+1) * (j+1)
        FinPour
    FinPour
    Retourner P
Fin
```
Déclaration : `P` (Tableau de N Lignes * N Colonnes Entier), `i` (Entier)

```
Fonction Recherche_Ligne(T : Tableau N*M Entier ; i, val, m : Entier) : Entier
    {Recherche dichotomique dans la ligne i}
    Debut
    deb ← 0  ;  fin ← m-1
    TantQue deb <= fin faire
        mil ← (deb + fin) / 2
        Si T[i, mil] = val Alors
            Retourner mil
        SinonSi T[i, mil] < val Alors
            deb ← mil + 1
        Sinon
            fin ← mil - 1
        FinSi
    FinTantQue
    Retourner -1
Fin
```
Déclaration : `i, j` (Entier), `deb, fin, mil` (Entier)

```
Fonction Existe(T : Tableau N*N Entier ; n, val : Entier) : Booléen
Début
    Pour i de 0 à n-1 faire
        Si Recherche_Ligne(T, i, val, n) ≠ -1 Alors
            Retourner VRAI
        FinSi
    FinPour
    Retourner FAUX
Fin
```

**Python (Numpy) :**
```python
import numpy as np

def pythagore(n):
    P = np.array([[int()]*n]*n)
    for i in range(n):
        for j in range(n):
            P[i, j] = (i+1) * (j+1)
    return P

def recherche_ligne(T, i, val, m):
    deb, fin = 0, m - 1
    while deb <= fin:
        mil = (deb + fin) // 2
        if T[i, mil] == val:
            return mil
        elif T[i, mil] < val:
            deb = mil + 1
        else:
            fin = mil - 1
    return -1

def existe(T, n, val):
    for i in range(n):
        if recherche_ligne(T, i, val, n) != -1:
            return True
    return False

n = 5
P = pythagore(n)
print(recherche_ligne(P, 2, 12, n))  # 3  (P[2,3]=12)
print(existe(P, n, 12))  # True
print(existe(P, n, 7))   # False
```
> Remarque (du PDF) : la recherche dichotomique est plus efficace que la recherche séquentielle : au lieu de parcourir toute la ligne, elle divise à chaque étape l'intervalle de recherche par 2 (ce qui suppose que chaque ligne de la matrice est triée, ce qui est le cas de la table de Pythagore).

## VI. Matrice — Série 2 (document 9) — 6 exercices corrigés

Matrices 6×6 de lettres majuscules (A-Z), remplies aléatoirement avec `M[i,j] = chr(65 + random.randint(0,25))`.

### Exercice 1 — Lignes palindromes dans une matrice (difficulté ★★★☆☆)

**Énoncé :** Écrire un algorithme modulaire qui : 1) remplit M (6×6) aléatoirement de lettres majuscules ; 2) pour chaque ligne, détermine si elle forme un palindrome ; 3) affiche les numéros des lignes palindromes et le nombre total ; 4) affiche 'AUCUNE LIGNE PALINDROME' si aucune n'est trouvée.

**Exemple :** Ligne 0 "ABCCBA" → palindrome. Ligne 2 "KAYXAK" → Y≠X → non palindrome. Ligne 4 "MATTAM" → palindrome. → 2 lignes palindromes (0 et 4).

**Algorithme principal :**
```
Algorithme Palindrome_Matrice
Debut
    Remplir_M (M)
    Afficher_M (M)
    Chercher_Palindromes (M)
Fin
```
T.D.N.T : `Matrice = Tableau de 6 lignes et 6 colonnes de Caractère`
T.D.O.G : `M` (Matrice), `Remplir_M, Afficher_M, Chercher_Palindromes` (Procédure), `Est_Palindrome` (Fonction : Booléen)

```
procédure Remplir_M (@M : Matrice) ;
Debut
    Pour i de 0 à 5 Faire
        Pour j de 0 à 5 Faire
            M[i, j] ←CHR (65 + Aléa(0,26))
        Fin Pour
    Fin Pour
Fin

procédure Afficher_M (M : Matrice) ;
Debut
    Pour i de 0 à 5 Faire
        Pour j de 0 à 5 Faire
            Ecrire (M[i, j], ' ')
        Fin Pour
        Ecrire ()
    Fin Pour
Fin

Fonction Est_Palindrome (lig : Entier ; M : Matrice) : Booléen ;
Debut
    ok ←Vrai
    Pour j de 0 à 2 Faire
        Si M[lig, j] ≠ M[lig, 5-j] Alors
            ok ←Faux
        Fin Si
    Fin Pour
    Est_Palindrome ←ok
Fin

procédure Chercher_Palindromes (M : Matrice) ;
Debut
    nb ←0
    Pour i de 0 à 5 Faire
        Si Est_Palindrome (i, M) Alors
            Ecrire ('Ligne ', i+1, ' est un palindrome')
            nb ←nb + 1
        Fin Si
    Fin Pour
    Si nb > 0 Alors
        Ecrire ('Nombre total de palindromes : ', nb)
    Sinon
        Ecrire ('AUCUNE LIGNE PALINDROME')
    Fin Si
Fin
```

**Python :**
```python
import numpy as np
import random

def remplir_M():
    M = np.array([[' '] * 6] * 6, dtype='U1')
    for i in range(6):
        for j in range(6):
            M[i, j] = chr(65 + random.randint(0, 25))
    return M

def afficher_M(M):
    for i in range(6):
        for j in range(6):
            print(M[i, j], end=' ')
        print()

def est_palindrome(lig, M):
    ok = True
    for j in range(3):
        if M[lig, j] != M[lig, 5 - j]:
            ok = False
    return ok

def chercher_palindromes(M):
    nb = 0
    for i in range(6):
        if est_palindrome(i, M):
            print('Ligne', i + 1, 'est un palindrome')
            nb = nb + 1
    if nb > 0:
        print('Nombre total de palindromes :', nb)
    else:
        print('AUCUNE LIGNE PALINDROME')

M = remplir_M()
afficher_M(M)
chercher_palindromes(M)
```

### Exercice 2 — Lettre la plus fréquente dans une matrice (difficulté ★★★★☆)

**Énoncé :** Matrice M (6×6) de lettres majuscules. Algorithme modulaire qui : 1) remplit M aléatoirement ; 2) compte le nombre d'occurrences de chaque lettre (A à Z) ; 3) affiche la lettre la plus fréquente et son nombre d'apparitions ; 4) affiche toutes les positions (ligne, colonne) où cette lettre apparaît.

**Exemple :** la lettre A apparaît 9 fois aux positions (0,0),(0,2),(0,4),(1,1),(1,3),(2,2),(2,5),(5,2),(5,3).

**Contraintes :** utiliser un tableau `Freq[26]` initialisé à 0 ; conversion lettre→indice : `indice ← Ord(M[i][j]) - Ord('A')` ; en cas d'égalité, afficher toutes les lettres ayant la fréquence maximale ; chaque position s'affiche sur une ligne séparée.

**Algorithme principal :**
```
Algorithme Frequence_Lettres
Debut
    Remplir_M (M)
    Afficher_M (M)
    Compter_Occurrences (M, occ)
    indMax ←Lettre_Max (occ)
    Afficher_Resultats (M, occ, indMax)
Fin
```
T.D.N.T : `Matrice = Tableau de 6 lignes et 6 colonnes de Caractère`, `Occurrences = Tableau de 26 Entiers`

```
procédure Compter_Occurrences (M : Matrice ; @occ : Occurrences) ;
Debut
    Pour k de 0 à 25 Faire
        occ[k] ←0
    Fin Pour
    Pour i de 0 à 5 Faire
        Pour j de 0 à 5 Faire
            occ[ORD(M[i,j]) - 65] ←occ[ORD(M[i,j]) - 65] + 1
        Fin Pour
    Fin Pour
Fin

Fonction Lettre_Max (occ : Occurrences) : Entier ;
Debut
    indMax ←0
    Pour k de 1 à 25 Faire
        Si occ[k] > occ[indMax] Alors
            indMax ←k
        Fin Si
    Fin Pour
    Lettre_Max ←indMax
Fin

procédure Afficher_Resultats (M : Matrice ; occ : Occurrences ; indMax : Entier) ;
Debut
    Ecrire ('Fréquence maximale : ', occ[indMax])
    Pour k de 0 à 25 Faire
        Si occ[k] = occ[indMax] Alors
            Ecrire ('Lettre : ', CHR(65 + k))
            Ecrire ('Positions :')
            Pour i de 0 à 5 Faire
                Pour j de 0 à 5 Faire
                    Si M[i, j] = CHR(65 + k) Alors
                        Ecrire ('(', i, ',', j, ')')
                    Fin Si
                Fin Pour
            Fin Pour
        Fin Si
    Fin Pour
Fin
```

**Python :**
```python
def compter_occurrences(M):
    occ = np.array([0] * 26)
    for i in range(6):
        for j in range(6):
            occ[ord(M[i, j]) - 65] = occ[ord(M[i, j]) - 65] + 1
    return occ

def lettre_max(occ):
    indMax = 0
    for k in range(1, 26):
        if occ[k] > occ[indMax]:
            indMax = k
    return indMax

def afficher_resultats(M, occ, indMax):
    print('Fréquence maximale :', occ[indMax])
    for k in range(26):
        if occ[k] == occ[indMax]:
            print('Lettre :', chr(65 + k))
            print('Positions :')
            for i in range(6):
                for j in range(6):
                    if M[i, j] == chr(65 + k):
                        print('(', i, ',', j, ')')

M = remplir_M()
afficher_M(M)
occ = compter_occurrences(M)
indMax = lettre_max(occ)
afficher_resultats(M, occ, indMax)
```

### Exercice 3 — Remplacement d'une lettre dans la matrice (difficulté ★★★☆☆)

**Énoncé :** Algorithme modulaire qui : 1) remplit M (6×6) aléatoirement ; 2) affiche M initiale ; 3) demande à l'utilisateur deux lettres Ancien et Nouveau ; 4) remplace toutes les occurrences d'Ancien par Nouveau ; 5) affiche M modifiée et le nombre de remplacements.

**Exemple :** remplacement de toutes les lettres 'A' par 'Z' → 10 remplacements effectués.

**Contraintes :** vérifier que les lettres saisies sont bien des majuscules (A-Z) ; si Ancien = Nouveau, afficher un message et ne rien modifier ; si Ancien n'existe pas, afficher 'Lettre non trouvée' ; module distinct pour le remplacement qui retourne le nombre de substitutions.

**Algorithme principal :**
```
Algorithme Remplacement_Lettres
Debut
    Remplir_M (M)
    Afficher_M (M)
    Saisir_Lettres (Ancien, Nouveau)
    Si Ancien = Nouveau Alors
        Ecrire ('Ancien et Nouveau sont identiques, aucune modification.')
    Sinon
        Remplacer (M, Ancien, Nouveau, nb)
        Si nb = 0 Alors
            Ecrire ('Lettre non trouvée')
        Sinon
            Afficher_M (M)
            Ecrire ('Nombre de remplacements : ', nb)
        Fin Si
    Fin Si
Fin
```

```
procédure Saisir_Lettres (@Ancien : Caractère ; @Nouveau : Caractère) ;
Debut
    Repeter
        Ecrire ('Lettre à remplacer (A-Z) : ')
        Lire (Ancien)
    Jusqu'à (Ancien ≥ 'A') et (Ancien ≤ 'Z')
    Repeter
        Ecrire ('Lettre de remplacement (A-Z) : ')
        Lire (Nouveau)
    Jusqu'à (Nouveau ≥ 'A') et (Nouveau ≤ 'Z')
Fin

procédure Remplacer (@M : Matrice ; Ancien : Caractère ; Nouveau : Caractère ; @nb : Entier) ;
Debut
    nb ←0
    Pour i de 0 à 5 Faire
        Pour j de 0 à 5 Faire
            Si M[i, j] = Ancien Alors
                M[i, j] ←Nouveau
                nb ←nb + 1
            Fin Si
        Fin Pour
    Fin Pour
Fin
```

**Python :**
```python
def saisir_lettres():
    Ancien = input('Lettre à remplacer (A-Z) : ').upper()[0]
    while not ('A' <= Ancien <= 'Z'):
        Ancien = input('Lettre à remplacer (A-Z) : ').upper()[0]
    Nouveau = input('Lettre de remplacement (A-Z) : ').upper()[0]
    while not ('A' <= Nouveau <= 'Z'):
        Nouveau = input('Lettre de remplacement (A-Z) : ').upper()[0]
    return Ancien, Nouveau

def remplacer(M, Ancien, Nouveau):
    nb = 0
    for i in range(6):
        for j in range(6):
            if M[i, j] == Ancien:
                M[i, j] = Nouveau
                nb = nb + 1
    return nb

M = remplir_M()
print('Matrice initiale :')
afficher_M(M)
Ancien, Nouveau = saisir_lettres()
if Ancien == Nouveau:
    print('Ancien et Nouveau sont identiques, aucune modification.')
else:
    nb = remplacer(M, Ancien, Nouveau)
    if nb == 0:
        print('Lettre non trouvée')
    else:
        print('Matrice modifiée :')
        afficher_M(M)
        print('Nombre de remplacements :', nb)
```

### Exercice 4 — Diagonale principale : suite alphabétique croissante ? (difficulté ★★★☆☆)

**Énoncé :** La diagonale principale d'une matrice M (N×N) est formée des éléments M[0][0], M[1][1], ..., M[N-1][N-1]. Elle est en ordre alphabétique croissant si chaque lettre est strictement inférieure à la suivante. Algorithme modulaire qui : 1) remplit M (6×6) aléatoirement ; 2) extrait la diagonale principale dans un tableau D ; 3) vérifie si D est strictement croissant ; 4) affiche la diagonale puis 'DIAGONALE CROISSANTE' ou 'DIAGONALE NON CROISSANTE' en précisant la position de rupture.

**Exemples :** diagonale "BEGLOT" → B<E<G<L<O<T → CROISSANTE. Diagonale "BAGLKT" → B≥A → NON CROISSANTE, rupture en position 2.

**Algorithme principal :**
```
Algorithme Diagonale_Croissante
Debut
    Remplir_M (M)
    Afficher_M (M)
    Extraire_Diagonale (M, D)
    Afficher_Diagonale (D)
    Verifier_Diagonale (D)
Fin
```
T.D.N.T : `Diagonale = Tableau de 6 Caractères`

```
procédure Extraire_Diagonale (M : Matrice ; @D : Diagonale) ;
Debut
    Pour i de 0 à 5 Faire
        D[i] ←M[i, i]
    Fin Pour
Fin

procédure Afficher_Diagonale (D : Diagonale) ;
Debut
    Ecrire ('Diagonale : ')
    Pour i de 0 à 5 Faire
        Ecrire (D[i], ' ')
    Fin Pour
    Ecrire ()
Fin

Fonction Est_Croissante (D : Diagonale) : Booléen ;
Debut
    ok ←Vrai
    Pour i de 0 à 4 Faire
        Si D[i] ≥ D[i+1] Alors
            ok ←Faux
        Fin Si
    Fin Pour
    Est_Croissante ←ok
Fin

procédure Verifier_Diagonale (D : Diagonale) ;
Debut
    Si Est_Croissante (D) Alors
        Ecrire ('DIAGONALE CROISSANTE')
    Sinon
        Ecrire ('DIAGONALE NON CROISSANTE')
        pos ←0
        Tant que (pos < 5) et (D[pos] < D[pos+1]) Faire
            pos ←pos + 1
        Fin TantQue
        Ecrire ('Rupture en position ', pos+2, ' : ', D[pos], ' ≥ ', D[pos+1])
    Fin Si
Fin
```

**Python :**
```python
def extraire_diagonale(M):
    D = np.array([' '] * 6, dtype='U1')
    for i in range(6):
        D[i] = M[i, i]
    return D

def afficher_diagonale(D):
    print('Diagonale :', end=' ')
    for i in range(6):
        print(D[i], end='  ')
    print()

def est_croissante(D):
    ok = True
    for i in range(5):
        if D[i] >= D[i + 1]:
            ok = False
    return ok

def verifier_diagonale(D):
    if est_croissante(D):
        print('DIAGONALE CROISSANTE')
    else:
        print('DIAGONALE NON CROISSANTE')
        pos = 0
        while pos < 5 and D[pos] < D[pos + 1]:
            pos = pos + 1
        print('Rupture en position', pos + 2, ':', D[pos], '>=', D[pos + 1])

M = remplir_M()
afficher_M(M)
D = extraire_diagonale(M)
afficher_diagonale(D)
verifier_diagonale(D)
```

### Exercice 5 — Triangle de Pascal (difficulté ★★★☆☆)

**Énoncé :** Afficher les n premières lignes du Triangle de Pascal (2 ≤ n ≤ 100). Pour une ligne donnée, le premier et le dernier éléments valent 1 ; les autres sont donnés par `MAT[ligne, colonne] = MAT[ligne-1, colonne] + MAT[ligne-1, colonne-1]`.

**Exemple (n=3) :** ligne 0 : 1 ; ligne 1 : 1 1 ; ligne 2 : 1 2 1 (MAT[2,1] = MAT[1,1] + MAT[1,0]).
**Exemple (n=5) :** 1 / 1 1 / 1 2 1 / 1 3 3 1 / 1 4 6 4 1 (MAT[4,3] = MAT[3,3] + MAT[3,2] — traitement récurrent d'ordre 2).

**Algorithme principal :**
```
Algorithme Triangle_Pascal
Debut
Saisir (N)
Remplir_MAT (N, MAT)
Afficher_Triangle (N, MAT)
Fin
```
T.D.N.T : `Matrice = Tableau de max lignes et max colonnes d'entiers`. T.D.O : `Max` (Constante = 100), `N` (Entier), `MAT` (Matrice)

```
procédure Saisir (@N : Entier) ;
Debut
Repeter
    Ecrire ("N= ")
    Lire (N)
Jusqu'à (N>=2) et (N<=100)
Fin

procédure Remplir_MAT (N : Entier; @ MAT : Matrice);
Debut
Pour ligne de 0 à N-1 Faire
    Pour colonne de 0 à ligne Faire
       si ( colonne =0) ou (ligne = colonne)
                MAT [ligne, colonne] ←1
       sinon
         MAT [ligne, colonne] ←MAT [ligne-1, colonne] + MAT [ligne-1, colonne-1]
       Fin Si
    Fin Pour
Fin Pour
Fin

Procédure Afficher_Triangle (n : Entier ; mat : matrice)
Debut
Pour ligne de 0 à N-1 Faire
        Ecrire ()
        Pour colonne de 0 à ligne Faire
            Ecrire (Mat [ligne, colonne]," ")
        FinPour
FinPour
Fin
```

**Python :**
```python
def saisir():
    N = int(input('donner n'))
    while N < 2 or N > 100:
        N = int(input('donner n'))
    return N

def remplir(n, mat):
    for i in range(n):
        for j in range(i + 1):
            if j == 0 or j == i:
                mat[i, j] = 1
            else:
                mat[i, j] = mat[i - 1, j] + mat[i - 1, j - 1]

def afficher(N, mat):
    for i in range(N):
        for j in range(i + 1):
            print(mat[i, j], end=" ")
        print('\n')

N = saisir()
mat = np.array([[int()] * N] * N)
remplir(N, mat)
afficher(N, mat)
```

### Exercice 6 — Tableau et conversion binaire (difficulté ★★★★☆)

**Énoncé :** Algorithme modulaire qui : 1) remplit aléatoirement un tableau T par N entiers positifs de deux chiffres (2 ≤ N ≤ 15) ; 2) convertit chaque élément de T en son équivalent binaire sur 8 bits (zéros à gauche si besoin) et met le résultat dans une ligne d'une matrice M ; 3) affiche le tableau T puis la matrice M.

**Algorithme principal :**
```
Algorithme Tableau_Conversion_Binaire
Debut
Saisir_N (N)
Remplir_T (N, T)
Conversion_Binaire (N, T, M)
Afficher_T (N, T)
Afficher_M (N, M)
Fin
```
T.D.N.T : `Tableau = Tableau de max entiers`, `Matrice = Tableau de max lignes et de 8 colonnes d'Entier`. T.D.O : `Max` (Constante = 15), `N` (Entier), `T` (Tableau), `M` (Matrice)

```
procédure Saisir_N (@N : Entier) ;
Debut
Repeter
    Ecrire ("N= ")
    Lire (N)
Jusqu'à (N>=2) et (N<=15)
Fin

procédure Remplir_T (N : Entier ; @T : Tableau) ;
Debut
Pour i de 0 à N-1 Faire
    T[i] ←10 + Aléa(0,90)
Fin Pour
Fin

procédure Conversion_Binaire (N : Entier ; T : Tableau ; @M : Matrice) ;
Debut
Pour i de 0 à N-1 Faire
    Decimal_Binaire (T[i], i, M)
Fin Pour
Fin

procédure Decimal_Binaire (val : Entier ; ligne : Entier ; @M : Matrice) ;
Debut
Pour j de 0 à 7 Faire
    M[ligne, j] ←0
Fin Pour
valeur ←val
position ←7
Tant que (valeur > 0) Faire
    M[ligne, position] ←valeur Mod 2
    valeur ←valeur Div 2
    position ←position - 1
Fin TantQue
Fin

procédure Afficher_T (N : Entier ; T : Tableau) ;
Debut
Pour i de 0 à N-1 Faire
    Ecrire (T[i], " ")
Fin Pour
Fin

procédure Afficher_M (N : Entier ; M : Matrice) ;
Debut
Pour i de 0 à N-1 Faire
    Pour j de 0 à 7 Faire
        Ecrire (M[i,j], " ")
    Fin Pour
    Ecrire ()
Fin Pour
Fin
```

**Python :**
```python
def saisir_n():
    N = int(input('N= '))
    while N < 2 or N > 15:
        N = int(input('N= '))
    return N

def remplir_T(N):
    T = np.array([0] * N)
    for i in range(N):
        T[i] = random.randint(10, 99)
    return T

def decimal_binaire(val, ligne, M):
    for j in range(8):
        M[ligne, j] = 0
    valeur = val
    position = 7
    while valeur > 0:
        M[ligne, position] = valeur % 2
        valeur = valeur // 2
        position = position - 1

def conversion_binaire(N, T):
    M = np.array([[0] * 8] * N)
    for i in range(N):
        decimal_binaire(T[i], i, M)
    return M

def afficher_T(N, T):
    for i in range(N):
        print(T[i], end=' ')
    print()

def afficher_M(N, M):
    for i in range(N):
        for j in range(8):
            print(M[i, j], end=' ')
        print()

N = saisir_n()
T = remplir_T(N)
M = conversion_binaire(N, T)
afficher_T(N, T)
afficher_M(N, M)
```
