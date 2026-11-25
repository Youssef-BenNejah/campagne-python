# Partie 8 — Calcul arithmétique
*Source : document_25077 (13).pdf et document_25077 (23).pdf (fichiers identiques) — Enseignant : Mohamed Gargouri, 3 SI-ALGO*

## I. Introduction

Cette partie est conçue pour les calculs, on va donc automatiser des règles mathématiques afin qu'on puisse les utiliser plus simplement sur machine.

## II. Le PGCD

Le plus grand commun diviseur de deux entiers a et b, appelé aussi PGCD, est le plus grand entier permettant de diviser a et b. On le note PGCD(a,b).

### Activité 1
Compléter les valeurs en pointillé :
PGCD(15,27) = PGCD(27,15) = PGCD(15,12) = PGCD(12,3) = PGCD(3,0) = **3**

### Principe
En appliquant la méthode d'Euclide :
- le PGCD(a,b) égale au PGCD(b, a mod b)
- Répéter la modification de a et b jusqu'à b égale à 0, et on dit que a est le pgcd.

### Algorithme de la fonction PGCD
*{on suppose que a et b strictement positifs}*
```
Fonction PGCD(a,b:entier):entier
Début
    Répéter
        aux ←a
        a ←b
        b ←aux mod b
    Jusqu'à b=0
    Retourner a
Fin
```
Objets locaux : `aux` (entier)

## III. Le PPCM

Le plus petit commun multiple de deux entiers a et b, appelé aussi PPCM, est le plus petit entier multiple à la fois de a et de b. On le note PPCM(a,b).

### Principe
- Déterminer Max(m,n)
- Chercher les multiples successifs de Max(m,n)
- Répéter l'étape 2 jusqu'à avoir un multiple de min(m,n)

### Algorithme du module PPCM
```
Fonction PPCM(a,b:entier):entier
Début
    Si m > n alors
        max ←m , min ←n
    sinon
        max ←n , min ←m
    Fin si
    aux ←max
    Tant que (max Mod min ≠ 0) Faire
        max ←max + aux
    Fin Tant que
    Retourner max
Fin
```
Objets locaux : `min,max,aux` (entier)

## IV. Les nombres premiers

Un entier supérieur à 1 est dit premier s'il n'est divisible que par 1 et par lui-même.

### Principe 1
En appliquant la règle mathématique, on peut calculer le nombre de diviseurs de n : s'il est égal à 2, on dit que n est premier.

### Principe 2
Parcourir les diviseurs possibles et on s'arrête dès qu'on trouve un diviseur ou qu'on atteint la fin de la liste.

### Algorithme du module Premier

**Méthode 1**
```
Fonction premier(n:entier):booléen
Début
    nb ←0
    Pour i de 1 à n faire
        Si n mod i=0 Alors
            nb ←nb+1
        Fin si
    Fin Pour
    Si nb=2 Alors
        res ←vrai
    Sinon
        res ←faux
    Fin si
    Retourner res
Fin
```
Objets locaux : `i,nb` (entier), `res` (booléen)

**Méthode 2**
```
Fonction premier(n:entier):booléen
Début
    res ←vrai , i ←1
    répéter
        i ←i+1
        res ← n mod i=0
    jusqu'à (res=faux) ou (i=n-1)
    Retourner res
Fin
```
Objets locaux : `i,nb` (entier), `res` (booléen)

## V. La factorielle

La factorielle d'un entier n donné est le produit de tous les entiers de l'intervalle [1,n]. La factorielle de n est notée n!

### Principe
En appliquant la règle mathématique : n! = n*(n-1)*(n-2)*...*2*1

### Algorithme du module Factorielle
```
Fonction Factorielle(n:entier):entier
Début
    f ←1
    Pour i de 1 à n faire
        f ←f*i
    Fin Pour
    Retourner f
Fin
```
Objets locaux : `i,f` (entier)

## VI. La décomposition en facteurs premiers

La décomposition d'un entier en produit de facteurs premiers consiste à écrire cet entier sous la forme d'un produit de ses diviseurs premiers.

### Principe
La méthode consiste à chercher et ranger les facteurs premiers de n dans un tableau.

### Algorithme du module FactPremier
```
Procédure FactPremier(Var Fact :Tab ; Var f : entier ; n : entier)
Début
    i ←2 , f ←0
    Répéter
        Si n mod i = 0 alors
            n ←n div i
            f ←f + 1
            Fact[f] ←i
        sinon
            i ←i + 1
        Fin si
    Jusqu'à (n = 1)
fin
```
Objets locaux : `i` (entier)
