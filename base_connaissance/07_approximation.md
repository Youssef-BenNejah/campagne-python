# Les algorithmes d'approximation
*Source : document_25077 (16).pdf — mathinfo.tn*

## I. Introduction

En mathématiques et en physique, certaines constantes importantes ne peuvent pas être calculées de manière exacte. On utilise alors des méthodes d'approximation : on calcule une valeur de plus en plus proche de la valeur réelle, en répétant un calcul simple un certain nombre de fois.

## II. Calcul de valeurs approchées de constantes connues

### Activité 1 — Constantes numériques usuelles
| Constante | Valeur | Description |
|---|---|---|
| e | 2,718... | Le nombre de Neper |
| π | 3,1416... | Le nombre π |
| g | 9,80665 | L'accélération normale de la pesanteur |

## 1) Valeur approchée de π

### a) Présentation
Le nombre π n'est pas égal à 3,14 qui n'est qu'une approximation de π (suffisante pour les calculs courants).

### b) Valeur approchée par la formule d'Euler
`π²/6 = 1 + 1/2² + 1/3² + ... + 1/n²`

**Algorithme (Pi_Euler) :**
```
Algorithme Pi_Euler
Début
    S2 ← 1, i ← 2
    Répéter
        S1 ← S2
        S2 ← S1 + 1 / Carré(i)
        i ← i + 1
    Jusqu'à RacineCarrée(6*S2) - RacineCarrée(6*S1) < Epsilon
    Ecrire ("La valeur approchée de Pi trouvée est : ", RacineCarrée(6*S2))
Fin
```
TDO : `i` (Entier Long), `S1, S2` (Réel), `Epsilon` (Constante = 10⁻⁴)

**Traduction en Python :**
```python
from math import *
Epsilon = 1E-4
S1 = 0
S2 = 1
i = 2
while not (sqrt(6*S2) - sqrt(6*S1) < Epsilon):
    S1 = S2
    S2 = S1 + 1/pow(i, 2)
    i = i + 1

print('La valeur approchée de Pi trouvée est : ', sqrt(6*S2))
```

**Application 1 :** exécuter avec Epsilon = 10⁻⁶ puis 10⁻⁷ et relever la valeur approchée de π.

### d) Valeur approchée par la formule de Wallis
`π/2 = (2/1) × (2/3) × (4/3) × (4/5) × (6/5) × (6/7) × (...)`

**Algorithme (Pi_Wallis) :**
```
Algorithme Pi_Wallis
Début
    P2 ← 2, i ← 2, Num ← 2, Den ← 3
    Répéter
        P1 ← P2
        P2 ← P1 × (Num/Den)
        Si i Mod 2 = 0 Alors Num ← Num + 2
        Sinon Den ← Den + 2
        Fin si
        i ← i + 1
    Jusqu'à Abs(2*P2 - 2*P1) < Epsilon
    Ecrire ("La valeur approchée de Pi trouvée est : ", 2*P2)
Fin
```
TDO : `i` (Entier), `P1, P2` (Réel), `Epsilon` (Constante = 10⁻⁴), `Num` (Entier), `Den` (Entier)

**Traduction en Python :**
```python
Epsilon = 1E-4
P2 = 2
P1 = 1
Num = 2
Den = 3
i = 2
while not(abs(2*P2 - 2*P1) < Epsilon):
    P1 = P2
    P2 = P1 * (Num / Den)
    if i % 2 == 0:
        Num = Num + 2
    else:
        Den = Den + 2
    i = i + 1

print('La valeur approchée de Pi trouvée est : ', 2*P2)
```

**Application :** exécuter avec Epsilon = 10⁻⁴ puis 10⁻⁵.

## 2) Valeur approchée de e

### a) Présentation
e (nombre de Neper / nombre exponentiel) est la base du logarithme népérien ≈ 2,7182818284 5904523536 0287471352 6624977572 4709369995 9574966967 ... C'est un nombre irrationnel, approché par : `1 + 1/1! + 1/2! + ...`

### b) Valeur approchée avec les factorielles
`e = 1 + 1/1! + 1/2! + 1/3! + 1/4! + 1/5! + 1/6! + ...` (précision 10⁻⁴)

**Algorithme (e_Fact) :**
```
Algorithme e_Fact
Début
    S2 ← 1, i ← 0
    Répéter
        S1 ← S2
        i ← i + 1
        S2 ← S2 + 1 / FN Fact(i)
    Jusqu'à S2 - S1 < Epsilon
    Ecrire ("La valeur approchée de e trouvée est : ", S2)
Fin
```
TDO : `i` (Entier), `S1, S2` (Réel), `Fact` (Fonction), `Epsilon` (Constante = 10⁻⁴)

**Traduction en Python :**
```python
Epsilon = 1E-4
def Fact(Nb):
    F = 1
    for j in range(1, Nb+1):
        F = F * j
    return F

S2 = 1
S1 = 0
i = 0
while not(S2 - S1 < Epsilon):
    S1 = S2
    i = i + 1
    S2 = S2 + 1/Fact(i)

print('La valeur approchée de e trouvée est : ', S2)
```

**Application :** exécuter avec Epsilon = 10⁻⁴ puis 10⁻⁵.

## 2bis) Valeur approchée de φ (Nombre d'or)

### a) Présentation
φ (phi), nombre d'or, constante irrationnelle connue depuis l'Antiquité : `φ = (1 + √5) / 2 ≈ 1,6180339887 4989484820 4586834365 6381177203 0917980576 ...`

### La suite de Fibonacci
On peut approximer φ à l'aide de la suite de Fibonacci : chaque terme est la somme des deux termes précédents.
`F(1) = 1, F(2) = 1, F(n) = F(n-1) + F(n-2)` → 1, 1, 2, 3, 5, 8, 13, 21...

| Rapport Fn+1 / Fn | |
|---|---|
| F7/F6 = 13/8 = 1.625 | F10/F9 = 55/34 ≈ 1.6176 | F20/F19 ≈ 1.61803 |

Plus n est grand, plus le rapport se rapproche de φ ≈ 1.618033...

### b) Valeur approchée avec la suite de Fibonacci (précision 10⁻⁴)
`F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)` et `φ ≈ F(n+1) / F(n)`

**Algorithme (phi_Fib) :**
```
Algorithme phi_Fib
Début
    a ← 0, b ← 1, S1 ← 0
    Répéter
        S1 ← b / a  (si a ≠ 0)
        temp ← b
        b ← a + b
        a ← temp
        S2 ← b / a
    Jusqu'à |S2 - S1| < Epsilon
    Ecrire ("La valeur approchée de φ trouvée est : ", S2)
Fin
```
TDO : `a, b, temp` (Entier), `S1, S2` (Réel), `Epsilon` (Constante = 10⁻⁴)

**Traduction en Python :**
```python
Epsilon = 1E-4

a = 0
b = 1
S2 = 0
S1 = 1
while not(abs(S2 - S1) < Epsilon):
    if a != 0:
        S1 = S2
        temp = b
        b = a + b
        a = temp
        S2 = b / a
    else:
        temp = b
        b = a + b
        a = temp

print('La valeur approchée de φ trouvée est : ', S2)
```

**Application :** exécuter avec Epsilon = 10⁻⁴ puis 10⁻⁵.

## 2) Valeur approchée de √N (Racine carrée) — méthode de Héron

### a) Présentation
La racine carrée d'un réel positif N, notée √N, est le réel positif x tel que x² = N. Exemples : √2 ≈ 1,41421356..., √3 ≈ 1,73205080..., √5 ≈ 2,23606797...
La racine carrée de la plupart des entiers est un nombre irrationnel. Sa valeur approchée peut être calculée par la **méthode de Héron d'Alexandrie** (dite aussi méthode babylonienne), qui consiste à construire la suite :
`x₀ = N / 2,   x(n+1) = (x(n) + N / x(n)) / 2`
Cette suite converge rapidement vers √N. On s'arrête dès que deux termes consécutifs sont suffisamment proches : `|x(n+1) - x(n)| < Epsilon`.

### b) Valeur approchée par la méthode de Héron (précision 10⁻⁴)

**Algorithme (racine_Heron) :**
```
Algorithme racine_Heron
Début
    Lire (N)
    S2 ← N / 2
    Répéter
        S1 ← S2
        S2 ← (S1 + N / S1) / 2
    Jusqu'à |S2 - S1| < Epsilon
    Ecrire ("La valeur approchée de √N trouvée est : ", S2)
Fin
```
TDO : `N` (Réel), `S1, S2` (Réel), `Epsilon` (Constante = 10⁻⁴)

**Traduction en Python :**
```python
Epsilon = 1E-4
N = float(input('Entrez le nombre N : '))
S2 = N / 2

valide = False
while not(valide):
    S1 = S2
    S2 = (S1 + N / S1) / 2
    valide = (abs(S2 - S1) < Epsilon)

print('La valeur approchée de racine carré de N est : ', S2)
```

**Application 1 :** tester avec N=2, Epsilon=10⁻⁴ puis 10⁻⁶ ; N=3, Epsilon=10⁻⁴ puis 10⁻⁶.
**Application 2 :** modifier le programme `racine_Heron` pour afficher également le nombre d'itérations nécessaires pour atteindre la précision souhaitée. Tester avec N=2 et différentes valeurs d'Epsilon.

## III. Exercices

### Exercice 1 — Choix d'un emballage : volumes égaux des boîtes A et B
Une société se propose de choisir un emballage pour son nouveau produit à partir de deux boîtes A et B de dimensions différentes :
- Boîte A : dimensions x, x, (40 - 2x) → volume = (40 - 2×x) × x × x
- Boîte B : dimensions (2x+1), 3, (7+x) → volume = (2×x + 1) × (7 + x) × 3

**Travail demandé :** sachant que les deux boîtes doivent avoir le même volume, écrire un algorithme d'une fonction qui reçoit en paramètre epsilon et le pas de variation de x, et retourne une valeur approchée de x pour laquelle les volumes des deux boîtes A et B soient égaux à epsilon près (avec pas ≤ epsilon/100). La variation de x commence à partir de 0.

### Exercice 2 — Piscines circulaires concentriques
Un maçon souhaite construire deux piscines circulaires concentriques (même centre) :
- Une piscine extérieure pour enfant de rayon fixe R1 = 9 mètres.
- Une piscine intérieure pour adulte de rayon R2.
L'objectif : les deux piscines (le disque intérieur et l'anneau extérieur) ont la même surface S.

**Travail demandé :** écrire une procédure qui permet de déterminer et afficher le rayon R2 de la piscine intérieure ainsi que la surface S, avec une précision epsilon passée en paramètre.
*Rappel : surface d'un cercle = π × R × R*
