# Partie 7 — Les algorithmes de recherches
*Source : document_25077 (22).pdf — Enseignant : Mohamed Gargouri, 3 SI-ALGO*

## I. Introduction

Il existe plusieurs méthodes de recherche parmi lesquelles on cite :
- Recherche séquentielle
- Recherche dichotomique

## II. La recherche séquentielle

### Principe
La recherche séquentielle consiste à parcourir une liste de valeurs jusqu'à trouver la valeur cherchée ou atteindre la fin de la liste.

### Décomposition modulaire
```
Recherche
 ├── Saisir(n)
 ├── Remplir(T,n)
 ├── SaisirX(x)
 ├── RechSeq(T,n,x)
 └── Afficher(res)
```

### Algorithme de la fonction RechSeq
```
Fonction RechSeq(T :TAB ;n,x:entier):booléen
Début
    res ←Faux , i ←0
    Répéter
        i ←i+1
        Si t[i]=x Alors
            res ←Vrai
        Fin si
    Jusqu'à (res) ou (i=n-1)
    Retourner res
Fin
```
Objets locaux : `i` (entier), `res` (booléen)

## III. La recherche dichotomique

### Principe
- Déterminer l'indice de l'élément du milieu.
- Si l'élément du milieu égal à celui recherché, l'élément est trouvé.
  - Si l'élément du milieu est supérieur à celui recherché, on recherche dans le sous-tableau gauche.
  - Si l'élément du milieu est inférieur à celui recherché, on recherche dans le sous-tableau droit.
- Répéter le traitement précédent jusqu'à trouver l'élément ou atteindre la fin de la recherche.

> Prérequis implicite : le tableau doit être **trié** pour que la recherche dichotomique fonctionne.

### Algorithme du module RechDich
```
Fonction RechDich(T :TAB ;n,x:entier):booléen
Début
    res ←Faux , d ←0, f ←n-1
    Répéter
        mil ←(d+f) div 2
        Si t[mil]=x Alors
            res ←Vrai
        sinon si T[Mil]>x Alors
            f ←mil-1
        sinon
            d ←mil+1
    Jusqu'à (res) ou (d>f)
    Retourner res
Fin
```
Objets locaux : `mil,d,f` (entier), `res` (booléen)

## IV. Les traitements avancés — rappel et application complète
*Source : document_25077 (5).pdf — "Les traitements avancés", 3ème année SI, mathinfo.tn*

### Rappel — structure générale (trous à compléter dans le document original)
```
Fonction rechercher (x :Entier, T :tab, n :entier):…………
Début
    ……..
    Répéter
        …………….
    Jusqu'à…………….
    Retourner …………
Fin
```

### Rappel — principe de la recherche dichotomique (ordre de tri croissant)
1. Fixer le début du tableau **deb**
2. Fixer la fin du tableau **fin**
3. Calcul du milieu **m ← (deb+fin) div 2**
4. Si x = t[m] donc x trouvé, on retourne vrai ou position = m. Sinon on divise le tableau en deux parties par rapport au milieu :
   - Si x > t[m] donc : refaire l'étape (3-4) sur la portion du tableau à droite de m, dont le deb ← m+1
   - Si x < t[m] donc : refaire l'étape (3-4) sur la portion du tableau à gauche de m, dont le fin ← m-1
5. Si deb > fin donc x non trouvé, on retourne faux / ou position -1

**Exemple de tableau trié T (9 éléments) :**
| 2 | 4 | 5 | 7 | 8 | 10 | 13 | 15 | 16 |
|---|---|---|---|---|---|---|---|---|
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |

**Traçage demandé dans le document** (tableaux deb/fin/m à compléter à la main) pour x=5 et x=11 — exercice de simulation manuelle, sans correction chiffrée fournie dans le PDF.

### Correction — Recherche séquentielle
```
Fonction rechercher (x :Entier, T :tab, n :entier):booléen
Début
    i ←-1
    Répéter
        i ←i+1
    Jusqu'à (t[i]=x ) ou( i=n-1)
    Retourner t[i]=x
Fin
```

### Correction — Recherche dichotomique
```
Fonction dicho(x :Entier, T :tab, n :entier):Entier
Début
    deb ←0
    fin ←n-1
    p ←-1
    Répéter
        m ←(deb+fin) div 2
        si  x>t[m] alors
            deb ←m+1
        Si non si x<t[m] alors
            fin ←m-1
        Sinon
            P ←m
    Jusqu'à p>-1 ou deb>fin
    Retourner P
Fin
```
Objets locaux : `deb,fin,m,p` (Entier)

### Application 1 — tableau trié aléatoire + recherche dichotomique

**Énoncé :** Écrire un programme qui permet de :
- Remplir un tableau T par 10 entiers aléatoires compris entre 5 et 20, **strictement croissant**
- Saisir un entier (A) compris entre 5 et 20
- Chercher et afficher la position de A dans le tableau T s'il existe, sinon afficher « entier inexistant »

**Correction — Algorithme du programme principal :**
```
Algorithme Application
Debut
    Remplir(t,n)
    Saisir(A)
    afficher(A,t,n)
Fin
```
T.D.N.T : `Tab = tableau de 20 entiers`
T.D.O.G : `t` (Tab), `A, n` (Entier), `remplir, saisir, afficher` (Procédure(s))

**Procédure remplir (tableau strictement croissant par tirages successifs contrôlés) :**
```
Procédure remplir (@t : Tab)
Debut
    T[0] ←alea(5,20)
    Pour j de 1 à 9 faire
        Repeter
            T[j] ←alea(5,20)
        Jusqu'à(t[j]>t[j-1])
    Fin Pour
Fin
```
Objets locaux : `j` (Entier)

**Procédure saisir :**
```
Procédure saisir(@x :entier)
Debut
    Repeter
        Lire(x)
    Jusqu'à  5<=x<=20
Fin
```

**Procédure Afficher (utilise la fonction dicho) :**
```
Procedure Afficher (@x :Entier, t : Tab,n :entier)
Debut
    P ← dicho(x,t,n)
    Si P>-1 alors
        Ecrire('Position=',P)
    Sinon
        Ecrire('Entier inexistant')
    FinSi
Fin
```
Objets locaux : `x,p` (Entier), `dicho` (fonction)

**Fonction dicho (reprise, avec déclaration locale) :**
```
Fonction dicho(x :Entier, T :tab, n :entier):Entier
début
    deb ←0
    fin ←n-1
    P ←-1
    Répéter
        m ←(deb+fin) div 2
        si  x>t[m] alors
            deb ←m+1
        Si non si x<t[m] alors
            fin ←m-1
        Sinon
            P ←m
    Jusqu'à m>-1 ou deb>fin
    Retourner P
Fin
```
Objets locaux : `deb,fin,m,p` (Entier)

**Implémentation Python complète :**
```python
from random import randint

def remplir(n):
    t = [0] * n
    t[0] = randint(5, 20)
    for j in range(1, n):
        t[j] = randint(5, 20)
        while not (t[j] > t[j - 1]):
            t[j] = randint(5, 20)
    return t

def saisir():
    x = int(input('x='))
    while not (5 <= x <= 20):
        x = int(input('x='))
    return x

def dicho(x, t, n):
    deb = 0
    fin = n - 1
    p = -1
    while not (p > -1 or deb > fin):
        m = (deb + fin) // 2
        if x > t[m]:
            deb = m + 1
        elif x < t[m]:
            fin = m - 1
        else:
            p = m
    return p

def afficher(x, t, n):
    p = dicho(x, t, n)
    if p > -1:
        print('Position=', p)
    else:
        print('Entier inexistant')

n = 10
t = remplir(n)
A = saisir()
afficher(A, t, n)
```
