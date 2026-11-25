# Corrections — Algorithme & Python : propriétés numériques sur un intervalle/tableau
*Source : document_25077 (14).pdf — mathinfo.tn*

Ce document regroupe 8 exercices corrigés, tous suivant la même méthodologie :
- a) Traduire l'algorithme principal en Python.
- b) Transformer la séquence de saisie/validation en un module (procédure) séparé.
- c) Développer le module de calcul (fonction) et le module d'affichage.

## Fonction utilitaire récurrente : `alpha` (vérifie qu'une chaîne ne contient que des lettres majuscules/minuscules)
```python
def alpha(ch):
    ch = ch.upper()
    i = -1
    ok = True
    while ok and i != len(ch) - 1:
        i += 1
        ok = ord(ch[i]) in range(ord("A"), ord("Z") + 1)
    return ok
```

## Exercice — ProdDiv (produit des diviseurs propres)

**Énoncé :** Étant donné un entier N qui vérifie la propriété : "le produit des diviseurs de N sauf lui-même est égal à N".
- Exemples : N = 10 vérifie cette propriété (1*2*5 = 10). N = 12 ne la vérifie pas (1*2*3*4*6 = 144).
- Écrire un programme Python qui détermine et affiche tous les nombres de l'intervalle [a,b] (avec 2 < a < b < 100) vérifiant cette propriété.

**Algorithme du programme principal :**
```
Début ProdDiv
    Répéter
        Ecrire("a=")
        Lire(a)
        Ecrire("b=")
        Lire(b)
    Jusqu'à (2 < a) et (a < b) et (b < 100)
    Afficher(a, b)
Fin ProdDiv
```

**Travail demandé :**
a. Traduire l'algorithme ProdDiv en Python et ajouter les déclarations nécessaires.
b. Transformer la séquence encadrée en un module et apporter les modifications nécessaires dans le programme principal.
c. Développer le module Afficher qui permet d'afficher tous les nombres de l'intervalle [a,b] vérifiant la propriété.

**Fonction ProduitDiv (algorithmique) :**
```
Fonction ProduitDiv(N:entier):entier
Début
    P ←1
    Pour D de 1 à N-1 faire
        Si (N mod D=0) Alors
            P ←P*D
        FinSi
    FinPour
    ProduitDiv ←P
Fin
```

**Implémentation Python :**
```python
def lire_ab():
    global a, b
    a = int(input("a="))
    b = int(input("b="))
    while not (2 < a and a < b and b < 100):
        a = int(input("a="))
        b = int(input("b="))

def produit_div(n):
    p = 1
    for d in range(1, n):
        if n % d == 0:
            p = p * d
    return p

def afficher(a, b):
    for n in range(a, b + 1):
        if produit_div(n) == n:
            print(n)

def prodDiv():
    lire_ab()
    afficher(a, b)

prodDiv()
```

## Exercice — UnitParf (entiers unitairement parfaits)

**Énoncé :** Un entier N est dit **unitairement parfait** s'il est égal à la somme de ses **diviseurs unitaires** sauf lui-même.
Un diviseur unitaire D de N vérifie : D divise N, et D et (N Div D) sont premiers entre eux (PGCD = 1).
- Exemple : N = 36 n'est pas unitairement parfait (somme des diviseurs unitaires = 14 ≠ 36).
- Exemple : N = 60 est unitairement parfait (1+3+4+5+12+15+20 = 60).

**Travail demandé :** écrire un programme Python qui détermine et affiche tous les nombres unitairement parfaits de l'intervalle [a,b] (2 ≤ a < b ≤ 100).

**Fonction utilitaire fournie — Test_Primalite (teste si p et k sont premiers entre eux, via Euclide par soustractions) :**
```python
def test_primalite(p, k):
    # On applique l'algorithme d'Euclide par soustraction
    while p != k:
        if p > k:
            p = p - k
        else:
            k = k - p
    # Ici p == k, c'est le PGCD
    return p == 1
```

**Fonction SommeDivUnit :**
```
Fonction SommeDivUnit(N:entier):entier
Début
    S ←0
    Pour D de 1 à N-1 faire
        Si (N mod D=0) Alors
            Si Test_Primalite(D,N div D) Alors
                S ←S+D
            FinSi
        FinSi
    FinPour
    SommeDivUnit ←S
Fin
```
```python
def somme_div_unit(n):
    s = 0
    for d in range(1, n):
        if n % d == 0:
            if test_primalite(d, n // d):
                s = s + d
    return s

def afficher(a, b):
    for n in range(a, b + 1):
        if somme_div_unit(n) == n:
            print(n)
```

## Exercice — Oblong (produit de deux entiers consécutifs)

**Énoncé :** Un nombre est dit **oblong** s'il est le produit de deux entiers naturels consécutifs.
- Exemples : 12 = 3*4, 272 = 16*17, 1640 = 40*41.
- Remplir un tableau T par N entiers positifs de quatre chiffres (2 < N < 10) et afficher tous les nombres oblongs du tableau T.

**Fonction Est_Oblong :**
```
Fonction Est_Oblong(x:entier):booléen
Début
    i ←0
    TantQue (i*(i+1)<x) faire
        i ←i+1
    FinTantQue
    Est_Oblong ←(i*(i+1)=x)
Fin
```
```python
def est_oblong(x):
    i = 0
    while i * (i + 1) < x:
        i = i + 1
    return i * (i + 1) == x

def remplir(n):
    t = zeros(n, dtype=int)
    for i in range(n):
        t[i] = int(input("T[" + str(i) + "]="))
        while not (t[i] > 1000 and t[i] < 9999):
            t[i] = int(input("T[" + str(i) + "]="))
    return t

def afficher(t, n):
    print("Les nombres oblongs sont : ")
    for i in range(n):
        if est_oblong(t[i]):
            print(t[i])
```

## Exercice — PuissDiv (produit des diviseurs = puissance de N)

**Énoncé :** Étant donné un entier N qui vérifie : "le produit des diviseurs de N sauf lui-même est égal à une puissance de N avec un exposant strictement supérieur à 0".
- N = 6 vérifie (produit = 6 = 6¹). N = 12 vérifie (produit = 144 = 12²). N = 30 vérifie (produit = 27000 = 30³). N = 9 et N = 11 ne vérifient pas.
- Déterminer et afficher tous les nombres de [a,b] (2 < a < b < 100) vérifiant la propriété.

**Fonction Est_Puissance :**
```
Fonction Est_Puissance(P,N:entier):booléen
Début
    Si (P<=1) Alors
        Est_Puissance ←Faux
    Sinon
        TantQue (P mod N=0) faire
            P ←P div N
        FinTantQue
        Est_Puissance ←(P=1)
    FinSi
Fin
```
```python
def est_puissance(p, n):
    if p <= 1:
        return False
    while p % n == 0:
        p = p // n
    return p == 1

def afficher(a, b):
    for n in range(a, b + 1):
        if est_puissance(produit_div(n), n):
            print(n)
```

## Exercice — Porte-bonheur (chiffres en suite arithmétique)

**Énoncé :** Un nombre X est dit **porte-bonheur** si ses chiffres forment une suite arithmétique de raison r (chiffres ordonnés, différence constante entre deux chiffres successifs).
- 1357 est porte-bonheur (1<3<5<7, raison 2). 8765 est porte-bonheur (8>7>6>5, raison -1). 3679 n'est pas porte-bonheur.
- Remplir un tableau T de N (5 ≤ N ≤ 30) entiers positifs de quatre chiffres, chercher et afficher tous les porte-bonheur.

**Fonction Est_PorteBonheur (sur un nombre à 4 chiffres) :**
```
Fonction Est_PorteBonheur(x:entier):booléen
Début
    d1 ←x div 1000
    d2 ←(x div 100) mod 10
    d3 ←(x div 10) mod 10
    d4 ←x mod 10
    r ←d2-d1
    Est_PorteBonheur ←(r<>0) et (d3-d2=r) et (d4-d3=r)
Fin
```
```python
def lire_n():
    n = int(input("Donner la taille du tableau : "))
    while not (5 <= n <= 30):
        n = int(input("Donner la taille du tableau : "))
    return n

def remplir(n):
    t = zeros(n, dtype=int)
    for i in range(n):
        t[i] = int(input("T[" + str(i) + "]="))
        while not (t[i] > 999 and t[i] < 10000):
            t[i] = int(input("T[" + str(i) + "]="))
    return t

def est_porte_bonheur(x):
    d1 = x // 1000
    d2 = (x // 100) % 10
    d3 = (x // 10) % 10
    d4 = x % 10
    r = d2 - d1
    return r != 0 and (d3 - d2 == r) and (d4 - d3 == r)

def afficher(t, n):
    print("Les nombres porte-bonheur sont : ")
    for i in range(n):
        if est_porte_bonheur(t[i]):
            print(t[i])
```

## Exercice — k-parfait

**Énoncé :** Un nombre P est appelé **k-parfait** si la somme de tous ses diviseurs positifs (y compris 1 et lui-même) est égale à k * P.
- 28 est 2-parfait (somme des diviseurs = 56 = 2*28). 120 est 3-parfait (360 = 3*120).
- Chercher et afficher tous les nombres de [N,M] (10 < N ≤ M < 31000) qui sont 2-parfaits (ligne 1), 3-parfaits (ligne 2), 4-parfaits (ligne 3).

```
Fonction SommeDiv(P:entier):entier
Début
    S ←0
    Pour D de 1 à P faire
        Si (P mod D=0) Alors
            S ←S+D
        FinSi
    FinPour
    SommeDiv ←S
Fin

Fonction Est_KParfait(P,k:entier):booléen
Début
    Est_KParfait ←(SommeDiv(P)=k*P)
Fin
```
```python
def somme_div(p):
    s = 0
    for d in range(1, p + 1):
        if p % d == 0:
            s = s + d
    return s

def est_k_parfait(p, k):
    return somme_div(p) == k * p

def afficher(n, m):
    for k in range(2, 5):
        for p in range(n, m + 1):
            if est_k_parfait(p, k):
                print(p, end=" ")
        print()
```

## Exercice — Nombres homogènes (mêmes facteurs premiers)

**Énoncé :** N et M sont dits **homogènes** s'ils admettent les mêmes facteurs premiers.
- N=60, M=90 sont homogènes (facteurs 2,3,5). N=60, M=420 ne le sont pas (420 a aussi le facteur 7).
- Saisir N et M (5 ≤ N < M), vérifier et afficher s'ils sont homogènes.

```python
def est_premier(x):
    if x < 2:
        return False
    i = 2
    while i * i <= x and x % i != 0:
        i = i + 1
    return i * i > x

def facteurs_premiers(x):
    f = zeros(10, dtype=int)
    nf = 0
    d = 2
    while d <= x:
        if x % d == 0 and est_premier(d):
            f[nf] = d
            nf = nf + 1
            while x % d == 0:
                x = x // d
        d = d + 1
    return f, nf

def sont_homogenes(n, m):
    f1, n1 = facteurs_premiers(n)
    f2, n2 = facteurs_premiers(m)
    if n1 != n2:
        return False
    for i in range(n1):
        trouve = False
        for j in range(n2):
            if f1[i] == f2[j]:
                trouve = True
        if not trouve:
            return False
    return True

def afficher(n, m):
    if sont_homogenes(n, m):
        print(n, "et", m, "sont homogenes")
    else:
        print(n, "et", m, "ne sont pas homogenes")
```

## Exercice — k-pp (Presque Premiers)

**Énoncé :** Un nombre est dit **k-pp** s'il s'écrit comme un produit de k nombres premiers non nécessairement distincts.
- 243 = 3*73 est 2-pp... (d'après l'exemple du texte). 32 = 2*2*2*2*2 est 5-pp. 17 est 1-pp (il est premier).
- Remplir un tableau T de N (5 ≤ N ≤ 50) entiers positifs à 3 chiffres, chercher et afficher les k-pp du tableau, k étant choisi aléatoirement dans [2,5].

```python
def nb_facteurs_premiers(x):
    c = 0
    d = 2
    while x > 1:
        while x % d == 0:
            c = c + 1
            x = x // d
        d = d + 1
    return c

def remplir(n):
    t = zeros(n, dtype=int)
    for i in range(n):
        t[i] = int(input("T[" + str(i) + "]="))
        while not (t[i] > 99 and t[i] < 1000):
            t[i] = int(input("T[" + str(i) + "]="))
    return t

def afficher(t, n, k):
    print("Les nombres", k, "-pp sont : ")
    for i in range(n):
        if nb_facteurs_premiers(t[i]) == k:
            print(t[i])

def kpp():
    n = lire_n()
    t = remplir(n)
    k = randint(2, 5)
    print("k =", k)
    afficher(t, n, k)

kpp()
```
