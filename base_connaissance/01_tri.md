# Partie 6 — Les algorithmes de tri
*Source : document_25077 (21).pdf — Enseignant : Mohamed Gargouri, 3 SI-ALGO*

## I. Introduction

Le tri consiste à repartir en plusieurs classes selon certains critères un ensemble d'éléments.
Il existe plusieurs algorithmes de tri parmi lesquels on cite :
- Le tri à bulle
- Le tri par sélection

## II. Le tri à bulle

### Principe
Le principe du tri à bulle consiste à :
- Parcourir le tableau en comparant chaque 2 éléments consécutifs et les échanger (ou permuter) s'ils sont désordonnés
- Refaire l'action précédente jusqu'à ce que le tableau soit trié.

### Décomposition modulaire
```
Tri
 ├── Saisir(n)
 ├── Remplir(T,n)
 ├── TriBulle(T,n)
 │     └── permuter(x,y)
 └── Afficher(T,n)
```

### Algorithme du programme principal
```
Algorithme Tri
Début
    Saisir(n)
    Remplir(T,n)
    TriBulle(T,n)
    Afficher(T,n)
Fin
```

### Tableau de création des types
| Types | |
|---|---|
| TAB | Tableau de 100 entiers |

### Tableau de déclaration des objets globaux
| Objets | Type |
|---|---|
| T | TAB |
| n | entier |
| Saisir | procédure |
| Remplir | procédure |
| TriBulle | procédure |
| Afficher | procédure |

### Algorithme du module saisir
```
Procédure saisir(@n:entier)
Début
    Répéter
        Ecrire("Entrez le nombre de cases du tableau:")
        Lire(n)
    Jusqu'à 5<=n<=100
Fin
```

### Algorithme du module remplir
```
Procédure Remplir(@T :TAB ;n:entier)
Début
    Pour i de 0 à n-1 faire
        Ecrire("Remplir la case d'indice",i," :")
        Lire(T[i])
    Fin pour
Fin
```
Objets locaux : `i` (entier)

### Algorithme de la procédure TriBulle (par ordre croissant)
```
Procédure TriBulle(@T :TAB ;n:entier)
Début
    Répéter
        b ←vrai {on suppose que le tableau est trié}
        Pour i de 0 à n-2 faire
            Si T[i]<T[i+1] Alors
                Permuter(T[i],T[i+1])
                b ←faux
            Fin si
        Fin pour
    Jusqu'à b=vrai
Fin
```
Objets locaux : `i` (entier), `b` (booléen), `permuter` (procédure)

> Remarque : ce tri, tel qu'écrit (`Si T[i]<T[i+1]`), trie le tableau par ordre **décroissant** (on permute quand T[i] est plus petit que T[i+1]). Pour un tri croissant classique on inverserait le test en `Si T[i]>T[i+1]`.

### Algorithme de la procédure permuter
```
Procédure permuter(@x,y:entier)
Début
    aux ←x
    x ←y
    y ←aux
Fin
```
Objets locaux : `aux` (entier)

### Algorithme de la procédure Afficher
```
Procédure Afficher(T :TAB ;n:entier)
Début
    Pour i de 0 à n-1 faire
        Ecrire(T[i],"|")
    Fin pour
Fin
```
Objets locaux : `i` (entier)

## I bis. Tri bulle — construction pas à pas par traçage
*Source : document_25077 (2).pdf — 3eme SI, mathinfo.tn*

### Démarche (boucle Pour simple, n=5)
```
Pour i de 5 a 1 faire (-1)
    Ecrire(i)
Fin pour
```
```python
for i in range(5, 0, -1):
    print(i)
```

### A/ Script de base (une seule passe)
```
1. POUR i DE 0 A 3 FAIRE
2.     SI t[i] > t[i+1] ALORS
3.         Permuter(t[i], t[i+1])
4.     FIN SI
5. FIN POUR
```
Trace sur T = [10, 13, 5, 4, 2] : après la 1ère passe complète → T = [10, 5, 4, 2, 13] (le plus grand élément « remonte » en dernière position, comme une bulle).

Une 2ème passe (indices 0 à 2) sur [10, 5, 4, 2, 13] donne [5, 4, 2, 10, 13].
Une 3ème passe (indices 0 à 1) sur [5, 4, 2, 10, 13] donne [4, 2, 5, 10, 13].
Une 4ème passe (indice 0) sur [4, 2, 5, 10, 13] donne [2, 4, 5, 10, 13] — tableau trié.

**Observation :** le traitement se répète 4 fois pour un tableau de 5 éléments (n=5), avec un nombre d'itérations internes qui diminue à chaque passe (j de n-2 à 0) :
```
1. POUR j DE 3 A 0 FAIRE (-1)
2.     POUR i DE 0 A j FAIRE
3.         SI t[i] > t[i+1] ALORS
4.             Permuter(t[i], t[i+1])
5.         FIN SI
6.     FIN POUR
7. FIN POUR
```

### Cas général (tableau de n entiers)
```
Procedure trier(@t :tab ;n :entier)
1. Debut
2. POUR j DE n-2 A 0 FAIRE
3.    POUR i DE 0 A j FAIRE
4.         SI t[i] > t[i+1] ALORS
5.             Permuter(t[i], t[i+1])
6.         FIN SI
7.     FIN POUR
8. FIN POUR
9. Fin
```

### Correction Python complète
```python
from numpy import *
from random import randint
t1 = array([int()] * 10)

def trier(t, n):
    for j in range(n - 2, -1, -1):
        for i in range(0, j + 1):
            if t[i] > t[i + 1]:
                permuter(t, i, i + 1)

def permuter(t1, i, j):  # Module permuter deux elements
    a = t1[i]
    t1[i] = t1[j]
    t1[j] = a

def saisir():  # Module saisir n et remplir t1
    global n
    global t1
    valide = False
    while valide == False:
        n = int(input('Donner n'))
        valide = 2 <= n <= 10
    for i in range(n):
        t1[i] = randint(10, 99)

def afficher(t1, n):  # Module afficher tableau
    for i in range(n):
        print('t1[', i, ']:', t1[i])

saisir()  # appel du module saisir
afficher(t1, n)  # appel du module afficher
print('Apres')
trier(t1, n)
afficher(t1, n)
```

## I ter. Problèmes de tri — Exercices de révision
*Source : document_25077 (4).pdf — 3SI, mathinfo.tn*

### Problème 1 — Tri de deux tableaux parallèles (Nom, Moy) par moyenne décroissante

**Énoncé :** Soient Nom et Moy deux tableaux contenant respectivement les noms et les moyennes de N élèves (3≤N≤50). Les noms sont des chaînes dont le premier caractère est une majuscule et les autres des minuscules ; les moyennes sont des réels entre 0 et 20. Écrire un programme Python qui remplit les deux tableaux (en respectant les contraintes), les trie par ordre décroissant des moyennes, puis affiche la liste des noms triés avec leur moyenne.

**Exemple (N=7) :** Nom=[Ali,Mohamed,Meriem,Sofienne,Lyna,Fatma,Fedi], Moy=[14,13.5,16,16.25,10,18.5,8.5] → affichage : Fatma 18.5, Sofienne 16.25, Meriem 16, Ali 14, Mohamed 13.5, Lyna 10, Fedi 8.5.

**Correction Python :**
```python
from numpy import *

def verif(ch):
    test = True
    if not ('A' <= ch[0] <= 'Z'):
        test = False
    for i in range(1, len(ch)):
        if not ('a' <= ch[i] <= 'z'):
            test = False
    return test

def trier(moy, nom, n):
    for i in range(n):
        maxi = i
        for j in range(i + 1, n):
            if moy[j] > moy[maxi]:
                maxi = j
        a = moy[i]
        moy[i] = moy[maxi]
        moy[maxi] = a

        a = nom[i]
        nom[i] = nom[maxi]
        nom[maxi] = a

def saisir():
    n = 0
    while not (3 <= n <= 50):
        n = int(input('n='))
    return n

def remplir2(nom, n):  # saisie des noms (contrôlée par verif)
    for i in range(n):
        nom[i] = str(input('nom[' + str(i) + ']='))
        while verif(nom[i]) == False:
            nom[i] = str(input('nom[' + str(i) + ']='))

def remplir1(moy, n):  # saisie des moyennes
    for i in range(n):
        moy[i] = float(input('moyenne[' + str(i) + ']='))
        while not (0 <= moy[i] <= 20):
            moy[i] = float(input('moyenne[' + str(i) + ']='))

def afficher(nom, moy, n):
    for i in range(n):
        print(nom[i], ' Moyenne  = ', moy[i])

n = saisir()
nom = array([str] * n)
moy = array([float()] * n)
remplir1(moy, n)
remplir2(nom, n)
trier(moy, nom, n)
afficher(nom, moy, n)
```

### Problème 2 — Tri des bateaux par distance au bateau en détresse

**Énoncé :** Un commandant de la garde côtière doit localiser les bateaux proches d'un bateau en détresse de coordonnées (Xd, Yd), à partir de N autres bateaux dont les coordonnées sont dans deux tableaux Tx et Ty (N≤50, deux bateaux n'ont jamais les mêmes coordonnées). Il faut remplir un tableau Td des distances au bateau en détresse, puis afficher les coordonnées (X,Y) des bateaux du plus proche au plus loin.
*Formule de distance :* `dAB = √((Xb-Xa)² + (Yb-Ya)²)`

**Exemple :** (Xd,Yd)=(500,300), N=5, Tx=[1000,500,100.25,-350,1200], Ty=[-300,400,-90,75,358.14] → Td=[781.02,100,558.48,879.28,702.41] → affichage trié : (500,400)(100.25,-90)(1200,358.14)(1000,-300)(-350,75)

**Décomposition modulaire :**
```
Algorithme principal
Debut
    saisir(Xd,Yd)      {saisir les coordonnées du bateau en détresse}
    remplir1(tx,ty,td,n)  { saisir les coordonnées de n bateaux}
    trier(tx,ty,td,n)
    afficher(tx,ty)
Fin
```

**T.D.N.T :** `Tab = tableau de 50 réels`

**T.D.O.G :** `nb` (entier), `tx,ty,td` (Tab), `n` (entier), `Saisir,remplir,generer,trier,afficher` (procédure)

**Algorithme Procédure « saisir » :**
```
Procedure saisir(@Xd, @Yd)
Début
    Lire(Xd)
    Lire(Yd)
Fin
```

**Algorithme Procédure « remplir » :**
```
Procedure remplir(@tx,@ty,@td :tab, Xd,Yd :reel, n :entier)
Début
Repeter
    Lire(n)
Jusqu'à 5<=n<=50
Pour i de 0 à n-1 faire
    Lire(tx[i])
    Lire(ty[i])
    Yd[i] ←racinecarré((Xd-tx[i])*(Xd-tx[i])+(Yd-ty[i])*(Yd-ty[i]))
FinPour
Fin
```

**Algorithme Fonction verifier (vérifie l'unicité des coordonnées) :**
```
fonction verifier(t :tab, a :reel) :booléen
Début
Test ←Vrai
Pour i de 0 à n-1 faire
    Si t[i]=a alors
        Test ←Faux
    FinSi
FinPour
Retourner Test
Fin
```

**Algorithme Procédure « trier » (tri par sélection sur 3 tableaux parallèles) :**
```
Procedure trier(@td,@tx,@ty :tab)
debut
Pour i de 0 à n-1
    min ←i
    Pour j de i+1 à n-1
        si td[j]<td[min] alors
            min ←j
        FinSi
    FinPour
    a ←td[i] ; td[i] ←td[min] ; td[min] ←a
    a ←tx[i] ; tx[i] ←tx[min] ; tx[min] ←a
    a ←ty[i] ; ty[i] ←ty[min] ; ty[min] ←a
FinPour
Fin Trier
```

**Algorithme Procédure « afficher » :**
```
Procedure afficher (tx,ty : Tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        Ecrire ('(',tx[i],',',ty[i],')' )
    Fin Pour
Fin
```

### Problème 3 — Grille de départ F1 (tri par vitesse décroissante)

**Énoncé (10 points) :** Pour déterminer la grille de départ d'une course de F1 sur le circuit de Monza (longueur 5,793 km), on saisit un tableau M des noms de n pilotes (10≤n≤24) et un tableau T de leurs meilleurs temps au format "m:s.ms". On calcule la vitesse moyenne de chacun : `Vitesse = 5,793 / ((m*60+s,ms)/3600)`. On trie les trois tableaux (noms, temps, vitesses) par vitesse décroissante puis on affiche la grille de départ (pilote + temps).

**Exemple (n=10) :** M=[Leclerc,Alonso,Verstappen,Perez,Hamilton,Sainz,Russel,Stroll,Bottas,Gasly], T=[1:48.321, 1:49.568, 1:48.015, 1:48.452, 1:48.370, 1:48.412, 1:48.915, 1:48.817, 1:49.265, 1.49.032] → V=[192.527,190.336,193.073,192.295,192.440,192.366,191.478,191.650,190.864,191.272] → après tri décroissant sur V : grille = 1-Verstappen(1:48.015), 2-Leclerc(1:48.015 [sic]), 3-Hamilton(1:48.370), 4-Sainz(1:48.412), 5-Perez(1:48.452), 6-Stroll(1:48.817), 7-Russel(1:48.915), 8-Gasly(1.49.032), 9-Bottas(1:49.265), 10-Alonso(1:49.568).

**Travail demandé** (non corrigé dans le document — énoncé seul) :
1) Écrire l'algorithme du programme principal en le décomposant en modules, avec le tableau de déclaration des objets globaux.
2) Écrire les algorithmes des modules envisagés et leurs tableaux de déclaration des objets locaux.

### Problème 4 — Réseau social : tri des personnes par nombre d'amis directs

**Énoncé (12 points) :** Simuler un traitement « Facebook » : remplir un tableau P de X chaînes alphabétiques (2≤X≤9) représentant des noms de personnes numérotées de 0 à X-1, remplir un tableau A de N chaînes de deux chiffres (9≤N≤100) représentant les relations d'amitié (ex. "01" = la personne 0 et la personne 1 sont amies). Une personne n'est jamais amie d'elle-même (jamais "00","11"...), "12" et "21" représentent la même relation (une seule est saisie), et une relation ne peut apparaître qu'une fois. Déterminer et afficher les noms des personnes par ordre décroissant du nombre d'amis directs.

**Exemple :** X=6, N=10, P=[Youssef,Rayen,Yemen,Rim,Rana,Azouz], A=["01","04","12","34","14","30","42","23","31","51"] → affichage : Rayen a 5 amis directs, Rim a 4 amis directs, Rana a 4 amis directs, Youssef a 3 amis directs, Yemen a 3 amis directs, Azouz a 1 ami direct.

**Travail demandé** (non corrigé dans le document — énoncé seul) :
1) Écrire un algorithme du programme principal, solution à ce problème, en le décomposant en modules.
2) Écrire les algorithmes pour chaque module envisagé.

### Problème 5 — Hitparade : classement de chansons par score de votes

**Énoncé :** Une station de radio classe chaque semaine 5 titres de chansons ("Hitparade") selon les votes téléphoniques des auditeurs (chaque vote ajoute 3 points au score de la chanson choisie, choix représenté par un chiffre de 1 à 5). Remplir un tableau T1 des 5 titres (lettres et espaces uniquement), saisir le nombre de participants Nb (5≤Nb≤100), générer le tableau T2 des scores, puis trier le tableau de chansons par score décroissant.

**Exemple :** T1=[Happy,Sorry,"Me Quemo",Rosa,Hello], Nb=11 participants ayant voté 5,4,5,1,2,5,1,2,4,1,5 → T2=[9,6,0,6,12] → affichage : Happy, Hello, "Me Quemo", Rosa, Sorry.

**Correction — décomposition modulaire :**
```
Algorithme principal
Debut
    saisir(nb)      #saisir nombre de participants
    remplir(t1)     #remplir un tableau de chansons
    generer(t2,nb)  #generer le tableau du score
    trier(t1)
    afficher(t1)
Fin
```
**T.D.N.T :** `Tab1 = tableau de 5 chaines`, `Tab2 = tableau de 5 entiers`

**Algorithmes des modules :**
```
Procedure saisir(@ nb :entier)
Debut
Repeter
    Ecrire('Donner un entier')
    Lire(nb)
Jusqu'à 5<=nb<=100
Fin

Procedure remplir(@t :tab)
Debut
Pour i de 1 à 5 faire
 Repeter
    Ecrire('t[',i,']')
    Lire(t[i])
 Jusqu'à verifier(t[i])=Vrai
FinPour
Fin

fonction verifier(ch :chaine):booleen
Début
i ←0
Test ←Vrai
Pour i de 0 à long(ch)-1 faire
   Si non('A'<=majus(ch[i])<='Z' ou ch[i]=' ') alors
    Test ←Faux
  FinSi
FinPour
Retourner Test
Fin

Procedure generer(@t2:tab,nb:entier)
Debut
Pour i de 1 à nb Faire
    Repeter
        Ecrire('Choix du participant ',i)
        Lire(c)
    Jusqu'à 1<=c<=5
    t2[c] ←t2[c]+3
Fin Pour
Fin

Procedure trier(t1 :tab1,@t2:tab2)
Begin
Pour i de 1 à 5
    Indicemin ←i
    Pour j de i+1 à 5
     si t2[j]<t2[indicemin] alors
            indicemin ←j
     FinSi
     FinPour
     a ←t2[i] ; t2[i] ←t2[indicemin] ; t2[indicemin] ←a
     a ←t1[i] ; T1[i] ←t1[indicemin] ; T1[indicemin] ←a
FinPour
Fin Trier

Procedure afficher (t : Tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        Ecrire (t[i])
    Fin Pour
Fin
```

**Implémentation Python complète :**
```python
from numpy import *

def alpha(ch):
    ch = ch.upper()
    i = -1
    ok = True
    while ok and i != len(ch) - 1:
        i = i + 1
        ok = ord(ch[i]) in range(ord("A"), ord("Z") + 1)
    return ok

def saisir():
    global n
    n = 4
    while not (5 <= n <= 100):
        n = int(input('Donner n'))

def tester(ch):
    v = True
    for i in range(len(ch)):
        if not ('A' <= ch[i].upper() <= 'Z' or ch[i] == ' '):
            v = False
    return v

def remplir(t, n):
    for i in range(1, n):
        t[i] = input('Chanson numero ' + str(i))
        while not (tester(t[i])):
            t[i] = input('Chanson numero ' + str(i))

def tri(t1, n, t2):
    for i in range(1, n):
        temp = t2[i]
        j = i
        # décalage des éléments du tableau
        temp2 = t1[i]
        while j > 1 and t2[j - 1] < temp:
            t2[j] = t2[j - 1]
            t1[j] = t1[j - 1]
            j = j - 1
        # on insère l'élément à sa place
        t2[j] = temp
        t1[j] = temp2
    print('Le classement est ')
    for i in range(1, n):
        print('Rang: ', str(i), t1[i])

def generer(t2, n):
    for i in range(1, n):
        c = int(input('Choix du participant :' + str(i) + ' '))
        while not (1 <= c <= 5):
            c = int(input('Votre choix :' + str(i) + ' '))
        t2[c] = t2[c] + 3

t1 = array([str] * 6)
remplir(t1, 6)
t2 = array([0] * 6)
saisir()
print(t2)
generer(t2, 6)
tri(t1, 6, t2)
```

## II bis. Tri par sélection — deux corrections Python
*Source : document_25077 (3).pdf — mathinfo.tn*

### Version 1 (fonctions séparées, sans global)
```python
from numpy import *
from random import randint

def saisir():  # Module saisir n et remplir t1
    valide = False
    while valide == False:
        n = int(input('Donner n'))
        valide = 2 <= n <= 10
    return n

def remplir(t, n):
    for i in range(n):
        t1[i] = randint(10, 99)

def afficher(t1, n):  # Module afficher tableau
    for i in range(n):
        print('t1[', i, '] :', t1[i])

def trier(t, n):  # Module Trier
    for i in range(n):
        mini = i
        for j in range(i + 1, n):
            if t[j] < t[mini]:
                mini = j
        a = t1[i]
        t1[i] = t1[mini]
        t1[mini] = a

n = saisir()  # appel du module saisir
t1 = array([int()] * n)
remplir(t1, n)
afficher(t1, n)  # appel du module afficher
print('Apres')
trier(t1, n)  # appel du module trier
afficher(t1, n)  # appel du module afficher
```

### Version 2 (variables globales, module `selection` + `permuter`)
```python
from numpy import *
from random import randint

t1 = array([int()] * 10)

def saisir():  # Module saisir n et remplir t1
    global n
    global t1
    valide = False
    while valide == False:
        n = int(input('Donner n'))
        valide = 2 <= n <= 10
    for i in range(n):
        t1[i] = randint(10, 99)

def afficher(t1, n):  # Module afficher tableau
    for i in range(n):
        print('t1[', i, '] :', t1[i])

def selection(t, n):  # Module trier
    for i in range(n):
        maxi = i
        for j in range(i + 1, n):
            if t[j] > t[maxi]:
                maxi = j
        permuter(t, i, maxi)

def permuter(t1, i, j):  # Module permuter deux elements
    a = t1[i]
    t1[i] = t1[j]
    t1[j] = a

saisir()  # appel du module saisir
afficher(t1, n)  # appel du module afficher
print('Apres')
selection(t1, n)
afficher(t1, n)  # appel du module afficher
```

## III. Le tri par sélection

### Principe
Le principe du tri par sélection consiste à :
- Rechercher le plus petit élément du tableau et le permuter avec le premier élément
- Rechercher le second plus petit élément et le permuter avec le deuxième élément
- Répéter ce traitement jusqu'à ce que le tableau soit trié.

### Décomposition modulaire
```
Tri
 ├── Saisir(n)
 ├── Remplir(T,n)
 ├── TriSel(T,n)
 │     ├── chercherPosMin(T,n,p)
 │     └── permuter(x,y)
 └── Afficher(T,n)
```

### Algorithme de la procédure TriSelection
```
Procédure TriSel(@T :TAB ;n:entier)
Début
    Pour i de 0 à n-1 faire
        Posmin ← chercherPosMin(T,n,i)
        Si posmin ≠ i Alors
            Permuter(T[i],T[posmin])
        Fin si
    Fin pour
Fin
```
Objets locaux : `i` (entier), `posmin` (entier), `chercherPosMin` (Fonction), `Permuter` (Procédure)

### Algorithme de la fonction chercherPosMin
```
Fonction chercherPosMin(T :TAB ;n,p:entier):entier
Début
    posmin ←p
    Pour i de p+1 à n faire
        Si t[i]<T[posmin] Alors
            posmin ←i
        Fin si
    Fin Pour
    Retourner posmin
Fin
```
Objets locaux : `i,posmin` (entier)

### Algorithme de la procédure permuter
```
Procédure permuter(@x,y:entier)
Début
    aux ←x
    x ←y
    y ←aux
Fin
```
Objets locaux : `aux` (entier)
