# Analyse modulaire — Série d'exercices (3ème SC, Tech et Math)
*Source : document_25077 (1).pdf — mathinfo.tn*

## Exercice 1 — Conversion en majuscules (T1 → T2)

**Énoncé :** Écrire un algorithme et son implémentation en Python d'un programme qui permet de :
- Saisir un tableau T1 par N chaînes (2≤N≤25)
- Convertir toutes les chaînes obtenues en majuscules puis les mettre dans un tableau T2
- Afficher le tableau T2

**Exemple :** T1 = [Ahmed, mahdi, la1] (n=3) → le programme affiche : [AHMED, MAHDI, LA1]

### Décomposition modulaire
```
Programme principal
 ├── SaisirN()
 ├── RemplirT1()
 ├── RemplirT2()
 │      └── fonction upper()
 └── Afficher()
```

### Algorithme du programme principal
```
Algorithme Ex1
Debut
    saisirN(n)
    RemplirT1(T1,n)
    afficher(T1,n)
    remplirT2(T2,T1,n)
    afficher(T2,n)
Fin
```

### Tableau de déclaration des nouveaux types (T.D.N.T)
| Type | |
|---|---|
| Tab | tableau de 25 chaînes |

### Tableau de déclaration des objets globaux (T.D.O.G)
| Objet | Type/Nature |
|---|---|
| T1 | Tab |
| T2 | Tab |
| n | Entier |

### Procédure saisirN
```
Procedure saisirN(@n :entier)
Debut
    Repeter
        Ecrire ("Taille tableau ")
        Lire (n)
    Jusqu'à 2<=n<=25
Fin
```

### Procédure remplirT1
```
Procedure remplirT1 (@t : Tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        Ecrire ("Donner element du tableau : ")
        Lire (t[i])
    Fin Pour
Fin
```
Objets locaux : `i` (Entier)

### Procédure remplirT2
```
Procedure remplirT2 (@T2 : Tab,t1 :tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        T2[i] ← majus(t1[i])
    Fin Pour
Fin
```
Objets locaux : `i` (Entier)

### Procédure afficher
```
Procedure afficher (t : Tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        Ecrire (t[i])
    Fin Pour
Fin
```
Objets locaux : `i` (Entier)

### Implémentation Python complète
```python
from numpy import array

def saisirN():
    valide = False
    while valide == False:
        n = int(input('Taille tableau '))
        valide = 2 <= n <= 25
    return n

def remplirT1(n):
    T1 = array([str] * n)
    for i in range(n):
        T1[i] = str(input('Donner element du tableau '))
    return T1

def remplirT2(T1, n):
    T2 = array([str] * n)
    for i in range(n):
        T2[i] = T1[i].upper()
    return T2

def afficher(t, n):
    for i in range(n):
        print(t[i])

# programme principale
n = saisirN()
T1 = remplirT1(n)
afficher(T1, n)
T2 = remplirT2(T1, n)
afficher(T2, n)
```

## Exercice 2 — Diviseurs de chaque élément (T1 → T2)

**Énoncé :** Écrire un algorithme et son implémentation en Python d'un programme qui permet de :
- Saisir un tableau T1 par N entiers de deux chiffres (2≤N≤10)
- Chercher tous les diviseurs de chaque élément du tableau puis les mettre dans un tableau T2 *(somme des diviseurs)*
- Afficher le tableau T2

**Exemple :** T1 = [6, 43, 5] (n=3) → le programme affiche : [12, 44, 6] *(somme des diviseurs de 6=12, de 43=44, de 5=6)*

### Fonction diviseur (somme des diviseurs)
```
Fonction dividieur (n :entier)
Debut
    S ←0
    for i in range (1,N+1):
        if n%i=0:
            S ←S+i
    retourner s
Fin
```
Objets locaux : `i,S` (Entier)

### Procédure remplirT1 (avec contrôle de saisie)
```
Procedure remplirT1 (@t : Tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        Repeter
            Ecrire ("Donner element du tableau : ")
            Lire (t[i])
        Jusqu'à 10<=t[i]<=99
    Fin Pour
Fin
```
Objets locaux : `i` (Entier)

### Procédure remplirT2
```
Procedure remplirT2 (@T2 : Tab,t1 :tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        T2[i] ← diviseur(t1[i])
    Fin Pour
Fin
```
Objets locaux : `i` (Entier)

### Implémentation Python
```python
from numpy import array

def saisirN():
    valide = False
    while valide == False:
        n = int(input('Taille tableau '))
        valide = 2 <= n <= 10
    return n

def remplirT1(n):
    T1 = array([str] * n)
    for i in range(n):
        valide = False
        while valide == False:
            t = int(input("Donner element du tableau : "))
            valide = 10 <= t <= 99
        T1[i] = t
    return T1

def diviseur(n):
    s = 0
    for i in range(1, N + 1):
        if n % i == 0:
            s = s + i
    return s

def remplirT2(T1, n):
    T2 = array([str] * n)
    for i in range(n):
        T2[i] = diviseur(T1[i])
    return T2

def afficher(t, n):
    for i in range(n):
        print(t[i])

# programme principale
n = saisirN()
T1 = remplirT1(n)
T2 = remplirT2(T1, n)
afficher(T2, n)
```

## Exercice 3 — Nombres premiers du tableau (T1 → T2)

**Énoncé :** Écrire un algorithme et son implémentation en Python d'un programme qui permet de :
- Saisir un tableau T1 par N entiers (2≤N≤10)
- Chercher tous les entiers premiers de chaque élément du tableau puis les mettre dans un tableau T2 *(c'est-à-dire : filtrer les éléments premiers du tableau)*
- Afficher le tableau T2

**Exemple :** T1 = [10, 2, 18, 7, 43, 10] (n=6) → le programme affiche : [2, 7, 43]

### Procédure saisirN
```
Procedure saisirN(var n :entier)
Debut
    Repeter
        Ecrire ("Taille tableau ")
        Lire (n)
    Jusqu'à 2<=n<=10
Fin
```

### Procédure remplirT
```
Procedure remplirT (@t : Tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        Ecrire ("Donner element du tableau : ")
        Lire (t[i])
    Fin Pour
Fin
```
Objets locaux : `i` (Entier)

### Fonction premier
```
Fonction premier (n :entier) :booleen
Debut
    valide ← Faux
    Somme ←0
    Pour i de 1 a n faire
        Si n mod i==0 alors
            somme ←somme+1
        FinSi
    Si somme==2 alors
        valide ←Vrai
    FinSi
    retourner valide
Fin
```
Objets locaux : `i,Somme` (Entier), `valide` (Booléen)

### Procédure afficher (filtrée sur premier)
```
Procedure afficher (t : Tab,n :entier)
Debut
    Pour i de 0 à n-1 faire
        Si (premier(t[i])==vrai )alors
            Ecrire (t[i])
        Fin Si
    Fin Pour
Fin
```
Objets locaux : `i` (Entier), `premier` (fonction)

### Implémentation Python complète
```python
from numpy import array

def saisirN():
    valide = False
    while valide == False:
        n = int(input('Taille tableau '))
        valide = 2 <= n <= 10
    return n

def remplirT(n):
    T1 = array([str] * n)
    for i in range(n):
        T1[i] = input("Donner element du tableau : ")
    return T1

def premier(n):
    valide = False
    somme = 0
    for i in range(1, n + 1):
        if n % i == 0:
            somme = somme + 1
    if somme == 2:
        valide = True
    return valide

def afficher(t, n):
    for i in range(n):
        if premier(t[i]):
            print(t[i])

# programme principale
n = saisirN()
T1 = remplirT(n)
afficher(T1, n)
```

## Exercice 4 — Script Python : max, permutation, recherche (sans algorithme intermédiaire)

**Énoncé :** Écrire un script en Python qui permet de :
- A/ Saisir aléatoirement un tableau T1 par N entiers de deux chiffres (2≤N≤10)
- B/ Chercher la valeur maximale de ce tableau
- C/ Saisir deux indices i et j puis permuter les deux éléments du tableau d'indice i et j
- D/ Vérifier l'existence d'un élément e dans le tableau

**Exemple :** T1 = [10, 12, 18, 17, 43, 10] (n=6) → "La valeur maximale est : 43". Pour i=0, j=2 → nouveau tableau : [18, 12, 10, 17, 43, 10]. Pour l'élément 23 à rechercher → `False`.

### Implémentation Python complète
```python
from numpy import *
from random import randint

def saisir():  # fonction saisir n et remplir t1
    valide = False
    while valide == False:
        n = int(input('Donner n'))
        valide = 2 <= n <= 10
    return n

def remplir(n):  # fonction afficher tableau
    t = array([int()] * n)
    for i in range(n):
        t[i] = randint(10, 99)
    return t

def afficher(t, n):  # procedure afficher tableau
    for i in range(n):
        print('t[', i, '] :', t[i])

def maximal(t, n):  # fonction chercher la valeur maximale
    maxi = t[0]
    for i in range(n):
        if t[i] > maxi:
            maxi = t[i]
    return maxi

def permuter(t, i, j):  # Module permuter deux éléments
    a = t[i]
    t[i] = t[j]
    t[j] = a

def verif(t1, e):  # Module vérifier existence de e dans le tableau
    valide = False
    for i in range(n):
        if t1[i] == e:
            valide = True
    return valide

n = saisir()  # appel du module saisir
t1 = remplir(n)
afficher(t1, n)  # appel du module afficher
print(' max :', maximal(t1, n))  # appel du module maximale

valide = False
while valide == False:
    i = int(input(' Donner indice i'))
    j = int(input(' Donner indice j'))
    valide = (i < n) and (j < n)

permuter(t1, i, j)  # appel du module permuter
afficher(t1, n)  # appel du module afficher
e = int(input(' Donner element à chercher'))
print(verif(t1, e))  # appel du module verif
```

## Exercice 5 — Pair/impair, estnum(), filtrage de chaînes numériques, chaîne minuscule

**Énoncé :**
- A/ Écrire un programme qui permet de saisir un entier N puis de déterminer la nature de cet entier pair ou impaire (retourner une chaîne de caractère 'pair' ou 'impair').
- C/ Répondre en A mais retourner `True` si pair ou `False` dans le cas contraire.
- D/ Redéfinir la fonction `estnum()` (vérifier si une chaîne est numérique ou non).
- E/ Écrire l'algorithme et l'implémentation en Python d'un programme qui permet de :
  - Remplir un tableau T de n chaînes de caractères (n>3) de longueur 5 caractères maximum
  - Afficher les chaînes composées uniquement par des chiffres
- F/ Définir une fonction qui détermine si une chaîne se compose par des caractères minuscules ou non.

**Exemple (partie E) :** T = ['1014', 'A29', '5L79', '20'] → le programme affiche : '1014', '20'

*(Remarque : cet exercice propose plusieurs variantes/fonctions à développer séparément ; aucune correction Python détaillée pour les parties C, D, E, F n'est fournie dans le document — seules les énoncés sont donnés.)*

## Exercice 6 — Moyennes et nombre d'élèves admis (n>=10)

**Énoncé :** Soit à saisir les moyennes de n élèves (2≤n≤30) dans un tableau. Il s'agit de trouver puis d'afficher le nombre d'élèves qui ont réussi (moyenne ≥ 10).

### Décomposition modulaire
```
Programme principal
 ├── Module saisir n
 ├── Module remplir le tableau
 └── Module Nombre
```

### Implémentation Python complète
```python
from numpy import array

def saisir():  # module saisir n
    valide = False
    while valide == False:
        n = int(input('Donner n'))
        valide = 2 <= n <= 10
    return n

def remplir(n):  # module saisir un tableau
    t = array([float()] * n)
    for i in range(n):
        t[i] = float(input('Donner la moyenne'))
    return t

def afficher(t, n):  # procedure afficher tableau
    for i in range(n):
        print('t[', i, '] :', t[i])

def nombre(t, n):  # fonction le nombre des eleves admis
    nb = 0
    for i in range(n):
        if t[i] >= 10:
            nb = nb + 1
    return nb

n = saisir()  # appel du module saisir
t1 = remplir(n)
afficher(t1, n)  # appel du module afficher
print(' Nombre :', nombre(t1, n))  # appel du module nombre
```

> Remarque : l'énoncé limite n à 2≤n≤30, mais la correction Python du document limite la saisie à 2≤n≤10 (incohérence présente dans le document original).
