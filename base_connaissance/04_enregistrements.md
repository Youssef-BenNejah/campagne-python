# Partie 9 — Les enregistrements
*Sources : document_25077 (24).pdf (cours, Mohamed Gargouri), (12).pdf (Série 2 — corrections), (10).pdf, (7).pdf, (8).pdf, (6).pdf (cours enregistrements / tableaux 2D)*

## I. Introduction

Un enregistrement est un type correspondant à un ensemble d'éléments de types éventuellement différents, auxquels on accède grâce à un nom.
Un enregistrement, comme un tableau, regroupe plusieurs informations. Mais alors que dans un tableau tous les éléments doivent être du même type, dans un enregistrement les différentes composantes (ou champs) peuvent être de type différent.

## II. Déclaration

### Tableau de déclaration des nouveaux types
```
Type
Nom_type = Enregistrement
    Champ 1 : Type 1
    ...       : ...
    Champ n : Type n
Fin Nom_type
```

### Tableau de déclaration des objets
| Objet | Type / Nature |
|---|---|
| Identificateur_objet | Nom_type |

### Activité 1
Déclarer le type **note** comme étant un enregistrement composé des champs : valeur (nombre), un coefficient (nombre) et une matière (chaîne de caractères).

**Solution :**
```
Type
Note = Enregistrement
    valeur : entier
    Coefficient : entier
    matière: chaine
Fin Note
```

## III. Manipulation des enregistrements

Pour un tableau, on accède à un élément en donnant le nom du tableau et la valeur de l'indice ; pour un enregistrement, on repère une composante par le nom de l'enregistrement et le nom du champ auquel on veut accéder, séparés par un point : **Variable.Champ**

- Affecter une valeur à un champ : `Variable.Champ ← Valeur`
- Lire un champ : `Lire(Variable.Champ)`
- Afficher un champ : `Ecrire(Variable.Champ)`

### Activité 2
a. Déclarez une variable enregistrement pour représenter la fiche d'un étudiant sachant qu'elle contient les informations suivantes : Nom, Prénom, sexe (F ou G), date de naissance et la moyenne au baccalauréat.
b. Affectez respectivement les valeurs suivantes à cette variable : "Kéfi", "Nour", "F", "27/11/1983" et 13.25

**Solution :**
```
Type
Fiche = Enregistrement
    nom, prénom : Chaîne
    sexe : Caractère
    date_nais : Chaîne
    moy : Réel
Fin Fiche
```
| Objets | Type |
|---|---|
| etudiant | Fiche |

```
etudiant.nom ← "Kéfi"          etudiant.prénom ← "Nour"
etudiant.sexe ← "F"            etudiant.date_nais ← "27/11/1983"
etudiant.moy ← 13.25
```

### Activité 3
Nous supposons que le nombre d'étudiants dans une classe est égal à N (4 <= N <= 30).
Question : proposer une structure de données utilisant un vecteur d'enregistrements pour représenter ces N étudiants, sachant que **Date** est un enregistrement contenant comme valeur jour, mois et année.

**Solution :**
```
Type
Date = Enregistrement
    jour : Entier
    mois : Chaîne
    année : Entier
Fin Date

Fiches = Enregistrement
    nom, prénom : Chaîne
    sexe : Caractère
    Date_nais : Date
    moy : Réel
Fin Fiches

Tab = Tableau de 30 Fiches
```
| Objets | Type |
|---|---|
| T | Tab |

### Activité 4 — Gestion des employés (analyse modulaire complète)

Une société veut informatiser la gestion de ses employés. Elle détient pour chacun les informations suivantes :
- Le nom et le prénom (chaîne de caractères)
- Le grade : uniquement G1, G2, G3 ou G4
- Le code fiscal (un entier)
- L'assurance maladie (O pour oui et N pour non)

Le nombre d'employés est N avec 4 ≤ N ≤ 120.

**Questions** : en utilisant l'approche de l'analyse modulaire, écrire un algorithme qui permet la saisie de toutes les fiches de renseignements puis d'afficher :
1. Toutes les fiches.
2. Le nombre d'employés ayant un grade donné et leur pourcentage par rapport au nombre total des employés.

**Décomposition modulaire :**
```
Gestion
 ├── Remplir(T,n)
 ├── lecture(G)
 ├── Chercher(T,n,G)
 └── AfficherNbG(T,n,nb,G)
       └── lecture(G)
```

**Programme principal :**
```
Algorithme Gestion
Début
    Remplir(T,n)
    Lecture(G)
    Chercher(T,n,G)
    Afficher(T,n,nb,G)
Fin
```

**Tableau de création des nouveaux types :**
```
Fiche = Enregistrement
    nom : Chaîne de 40 caractères
    grade : Chaîne de 2 caractères
    code : Entier non signé
    am : Caractère
Fin Fiche

Tab = Tableau de 100 fiches
Gr = Chaîne de 2 caractères
```

**Tableau de déclaration des objets globaux :**
| Objets | Type |
|---|---|
| T | TAB |
| N, nb | entier |
| G | Gr |
| Remplir | Procédure |
| Lecture | procédure |
| chercher | Fonction |
| Afficher | Procédure |

**Algorithme de la procédure Remplir :**
```
Procédure Remplir(@T :Tab ;@n :entier)
Début
    Répéter
        Ecrire("Entrer le nombre d'employés : ")
        Lire(n)
    Jusqu'à (n>4) et (n<100)
    Pour i de 1 à N Faire
        Ecrire("Entrer le nom et le prénom de l'employé : ")
        Lire(T[i].nom)
        Lecture(T[i].grade)
        Ecrire("Entrer son code fiscal : ")
        Lire(code)
        Répéter
            Ecrire("Assuré (Oui / Non) ? : ")
            Lire(T[i].am)
        Jusqu'à (Majus(T[i].am)="O") ou (Majus(T[i].am)="N")
    Fin Pour
Fin
```
Objets locaux : `i` (entier)

**Algorithme de la procédure Lecture :**
```
Procédure Lecture(@G : Gr)
Début
    Répéter
        Ecrire("Entrer le grade : ")
        Lire(G)
    Jusqu'à (G="G1") ou (G="G2") ou (G="G3") ou (G="G4")
Fin
```

**Algorithme de la fonction chercher :**
```
Fonction Chercher(T :Tab ; n :entier ;G :Gr) :entier
Début
    nb ←0
    Pour i de 1 à N Faire
        Si (T[i].grade = G) Alors
            nb ←nb + 1
        Fin Si
    Fin Pour
    Retourner nb
Fin
```
Objets locaux : `i,nb` (entier)

**Algorithme de la procédure Afficher :**
```
Procédure Afficher(T :Tab ;n,nb :entier ;G :Gr)
Début
    Pour i de 1 à n Faire
        Ecrire("Nom & prénom : ", nom)
        Ecrire("Grade : ", grade)
        Ecrire("Code fiscal : ", code)
        Ecrire("Assurance maladie :", am)
    Fin Pour
    Ecrire("Le nombre d'occurrences de ', G, " Est égal à : ", nb)
    P ←(Nb_G * 100) / N
    Ecrire("Le pourcentage de ", G, " Est de : ", P, " %")
Fin
```

---

## IV. Série 2 — exercices corrigés avec enregistrements (document 12)

### Exercice 2 — ELEVE

```
Type
ELEVE = Enregistrement
    Nom : Chaîne
    Prenom : Chaîne
    Moyenne : Réel
FinEnregistrement
```
| Objet | Type / Nature |
|---|---|
| e | ELEVE |
| Saisir, affiche | Procedure |

**Implémentation Python :**
```python
def alpha(ch):
    ch = ch.upper()
    i = -1
    ok = True
    while ok and i != len(ch) - 1:
        i += 1
        ok = ord(ch[i]) in range(ord("A"), ord("Z") + 1)
    return ok

def saisir(e):
    e["nom"] = input("Nom : ")
    while len(e["nom"]) == 0 or not alpha(e["nom"]):
        e["nom"] = input("Nom : ")

    e["prenom"] = input("Prénom : ")
    while len(e["prenom"]) == 0 or not alpha(e["prenom"]):
        e["prenom"] = input("Prénom : ")

    e["moyenne"] = float(input("Moyenne : "))
    while not (0 <= e["moyenne"] <= 20):
        e["moyenne"] = float(input("Moyenne : "))

def affiche(e):
    print("Nom     :", e["nom"])
    print("Prénom  :", e["prenom"])
    print("Moyenne :", e["moyenne"])

# Programme principal
e = {
    "nom": "",
    "prenom": "",
    "moyenne": 0.0
}
saisir(e)
affiche(e)
```

### Exercice 2 (correction alternative) — LIVRE

```
Type LIVRE = Enregistrement
    Titre : Chaîne
    NbPages : Entier
    Prix : Réel
FinEnregistrement
```

**Algorithme Saisir :**
```
Procédure Saisir(@l : LIVRE)
Début
    Répéter
        Ecrire("Titre : ")
        Lire(l.Titre)
    Jusqu'à (l.Titre <> "")
    Répéter
        Ecrire("Nombre de pages : ")
        Lire(l.NbPages)
    Jusqu'à (l.NbPages > 0)
    Répéter
        Ecrire("Prix : ")
        Lire(l.Prix)
    Jusqu'à (l.Prix >= 0)
Fin
```

**Algorithme Affiche :**
```
Procédure Affiche(l : LIVRE)
Début
    Ecrire("Titre   : ", l.Titre)
    Ecrire("NbPages : ", l.NbPages)
    Ecrire("Prix    : ", l.Prix)
Fin
```

**Algorithme principal :**
```
Début
    Saisir(l)
    Affiche(l)
Fin
```

**Implémentation Python :**
```python
def saisir(l):
    l["titre"] = input("Titre : ")
    while l["titre"] == "":
        l["titre"] = input("Titre : ")

    l["nbpages"] = int(input("Nombre de pages : "))
    while l["nbpages"] <= 0:
        l["nbpages"] = int(input("Nombre de pages : "))

    l["prix"] = float(input("Prix : "))
    while l["prix"] < 0:
        l["prix"] = float(input("Prix : "))

def affiche(l):
    print("Titre   :", l["titre"])
    print("NbPages :", l["nbpages"])
    print("Prix    :", l["prix"])

# Programme principal
l = {
    "titre": "",
    "nbpages": 0,
    "prix": 0.0
}
saisir(l)
affiche(l)
```

### Exercice 3 — RECTANGLE (Surface, Périmètre)

```
Type RECTANGLE = Enregistrement
    Longueur : Réel
    Largeur : Réel
FinEnregistrement
```

**Algorithme Saisir :**
```
Procédure Saisir(@r : RECTANGLE)
Début
    Répéter
        Ecrire("Longueur : ")
        Lire(r.Longueur)
    Jusqu'à (r.Longueur > 0)
    Répéter
        Ecrire("Largeur : ")
        Lire(r.Largeur)
    Jusqu'à (r.Largeur > 0)
Fin
```

**Fonction Surface :**
```
Fonction Surface(r : RECTANGLE) : Réel
Début
    Retourner(r.Longueur * r.Largeur)
Fin
```

**Fonction Perimetre :**
```
Fonction Perimetre(r : RECTANGLE) : Réel
Début
    Retourner(2 * (r.Longueur + r.Largeur))
Fin
```

**Programme principal :**
```
Début
    Saisir(r)
    Ecrire("Surface  : ", Surface(r))
    Ecrire("Périmètre : ", Perimetre(r))
Fin
```

**Implémentation Python :**
```python
def saisir(r):
    r["longueur"] = float(input("Longueur : "))
    while r["longueur"] <= 0:
        r["longueur"] = float(input("Longueur : "))

    r["largeur"] = float(input("Largeur : "))
    while r["largeur"] <= 0:
        r["largeur"] = float(input("Largeur : "))

def surface(r):
    return r["longueur"] * r["largeur"]

def perimetre(r):
    return 2 * (r["longueur"] + r["largeur"])

# Programme principal
r = {
    "longueur": 0.0,
    "largeur": 0.0
}
saisir(r)
print("Surface   :", surface(r))
print("Périmètre :", perimetre(r))
```

### Exercice 4 — ETUDIANT (tableau d'enregistrements, moyenne de classe, meilleurs élèves)

```
Type ETUDIANT = Enregistrement
    Nom : Chaîne
    Note : Réel
FinEnregistrement

TabEtudiants : Tableau de N ETUDIANT
```

**Procédure Remplir (réutilise la fonction Alpha de l'exercice 1) :**
```
Procédure Remplir(@T : Tableau de ETUDIANT ; N : Entier)
Début
    Pour i de 0 à N-1 Faire
        Répéter
            Ecrire("Nom de l'étudiant : ")
            Lire(T[i].Nom)
        Jusqu'à (T[i].Nom <> "") ET Alpha(T[i].Nom)
        Répéter
            Ecrire("Note : ")
            Lire(T[i].Note)
        Jusqu'à (0 <= T[i].Note <= 20)
    FinPour
Fin
```

**Fonction Moyenne :**
```
Fonction Moyenne(T : Tableau de ETUDIANT ; N : Entier) : Réel
Début
    S ← 0
    Pour i de 0 à N-1 Faire
        S ← S + T[i].Note
    FinPour
    Retourner(S / N)
Fin
```

**Procédure AfficherMeilleurs :**
```
Procédure AfficherMeilleurs(T : Tableau de ETUDIANT ; N : Entier ; Moy : Réel)
Début
    Pour i de 0 à N-1 Faire
        Si (T[i].Note >= Moy) Alors
            Ecrire(T[i].Nom)
        FinSi
    FinPour
Fin
```

**Algorithme principal :**
```
Début
    Ecrire("Nombre d'étudiants : ")
    Lire(N)
    Remplir(T, N)
    Moy ← Moyenne(T, N)
    Ecrire("Moyenne de la classe : ", Moy)
    AfficherMeilleurs(T, N, Moy)
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

def remplir(T, N):
    for i in range(N):
        T[i]["nom"] = input("Nom de l'étudiant : ")
        while len(T[i]["nom"]) == 0 or not alpha(T[i]["nom"]):
            T[i]["nom"] = input("Nom de l'étudiant : ")

        T[i]["note"] = float(input("Note : "))
        while not (0 <= T[i]["note"] <= 20):
            T[i]["note"] = float(input("Note : "))

def moyenne(T, N):
    S = 0
    for i in range(N):
        S = S + T[i]["note"]
    return S / N

def affichermeilleurs(T, N, Moy):
    for i in range(N):
        if T[i]["note"] >= Moy:
            print(T[i]["nom"])

# Programme principal
N = int(input("Nombre d'étudiants : "))
T = {}
for i in range(N):
    T[i] = {"nom": "", "note": 0.0}

remplir(T, N)
Moy = moyenne(T, N)
print("Moyenne de la classe :", Moy)
affichermeilleurs(T, N, Moy)
```

---

## V. Tableaux à 2 dimensions / matrices (documents 6, 7, 8)

Cours complet, algorithmes de base, implémentation Python (Numpy), exercices corrigés et QCM sur les tableaux à deux dimensions (matrices) : voir [09_tableaux_2d.md](09_tableaux_2d.md).

## VI. Document 10 — "Les Enregistrements" : cours complet + 6 exercices corrigés
*Source : document_25077 (10).pdf — "Les Enregistrements, Cours & Exercices Corrigés", 3ème année Sciences de l'Informatique, mathinfo.tn*

### Rappel de cours

**Définition :** un enregistrement est une structure de données qui permet de regrouper, sous un même nom, plusieurs informations (champs) pouvant être de types différents (simples ou structurés).

**Déclaration en algorithmique — 1ère méthode (déclaration directe) :**
| Objet | Type/Nature |
|---|---|
| Nom_Enregistrement | Enregistrement { Champ1: Type1; Champ2, Champ3: Type2; ...; ChampN: TypeM } |

**Déclaration en algorithmique — 2ème méthode (via un nouveau type) :**
```
Nom_Type_Enregistrement = Enregistrement
    Champ1 : Type1
    Champ2, Champ3 : Type2
    ...
    ChampN : TypeM
Fin
```
Puis : `Nom_Enregistrement : Nom_Type_Enregistrement`

**Déclaration en Python :**
```python
Nom_Enregistrement = { }   # signifie Enregistrement vide

Nom_Enregistrement = {
    "Champ1" : Type1 ( ) ,
    "Champ2" : Type2 ( ) ,
    "ChampN" : TypeN ( )
}
```

**Accès à un champ :** `Nom_Objet . Champ` (algorithmique) ↔ `Nom_Objet [ "Champ" ]` (Python)

**N.B. :** un champ d'un enregistrement peut être aussi un enregistrement ; on peut déclarer des tableaux d'enregistrements.

### Exercice 1 — Déclaration simple d'un enregistrement « Livre »

**Énoncé :** déclarer un enregistrement nommé « Livre » formé de quatre champs : « Titre » (chaîne), « Auteur » (chaîne), « NbPages » (entier) et « Prix » (réel). Écrire une déclaration en algorithmique (2ème méthode) puis sa traduction en Python.

**T.D.N.T :**
```
Livre = Enregistrement
    Titre : Chaîne
    Auteur : Chaîne
    NbPages : Entier
    Prix : Réel
Fin
```
T.D.O : `MonLivre` (Livre)

**Python :**
```python
MonLivre = {
    "Titre"   : str ( ) ,
    "Auteur"  : str ( ) ,
    "NbPages" : int ( ) ,
    "Prix"    : float ( )
}
```

### Exercice 2 — Tableau d'enregistrements « Etudiant »

**Énoncé :** enregistrement « Etudiant » (Nom : chaîne, Note : réel).
1) Déclarer l'enregistrement « Etudiant » et un tableau « TabEtudiants » de N étudiants (N donné).
2) Fonction « Saisie » qui remplit le tableau TabEtudiants.
3) Fonction « Moyenne » qui calcule et retourne la moyenne des notes.
4) Fonction « AfficherMeilleurs » qui affiche les noms des étudiants ayant une note ≥ à la moyenne.

**Déclaration :**
```
Etudiant = Enregistrement
    Nom : Chaîne
    Note : Réel
Fin
```
T.D.O : `N` (Entier), `TabEtudiants` (Tableau de N Etudiant), `Moy` (Réel)

**Python :**
```python
from numpy import *

def Saisie(N):
    TabEtudiants = {}
    for i in range(N):
        TabEtudiants[i] = {"Nom": str(), "Note": float()}
        TabEtudiants[i]["Nom"] = str(input("Nom de l'étudiant : "))
        TabEtudiants[i]["Note"] = float(input("Note : "))
    return TabEtudiants

def Moyenne(TabEtudiants, N):
    S = 0
    for i in range(N):
        S = S + TabEtudiants[i]["Note"]
    return S / N

def AfficherMeilleurs(TabEtudiants, N, Moy):
    for i in range(N):
        if TabEtudiants[i]["Note"] >= Moy:
            print(TabEtudiants[i]["Nom"])

N = int(input("Nombre d'étudiants : "))
TabEtudiants = Saisie(N)
Moy = Moyenne(TabEtudiants, N)
print("Moyenne de la classe :", Moy)
print("Étudiants ayant une note >= moyenne :")
AfficherMeilleurs(TabEtudiants, N, Moy)
```

### Exercice 3 — Enregistrement imbriqué « Personne » / « Date »

**Énoncé :** représenter une personne par un enregistrement « Personne » formé de : Nom (Chaîne), DateNaiss (un enregistrement « Date » formé de trois champs Jour, Mois, Annee, tous de type Entier).
1) Donner la déclaration en algorithmique (2ème méthode) de « Date » puis de « Personne ».
2) Écrire une fonction « AgeApprox » qui reçoit une Personne et une Année courante, et retourne son âge approximatif (Année courante − Année de naissance).

**Déclaration :**
```
Date = Enregistrement
    Jour : Entier
    Mois : Entier
    Annee : Entier
Fin

Personne = Enregistrement
    Nom : Chaîne
    DateNaiss : Date
Fin
```
T.D.O : `P` (Personne), `AnneeCourante` (Entier), `Age` (Entier)

**Python :**
```python
def AgeApprox(P, AnneeCourante):
    return AnneeCourante - P["DateNaiss"]["Annee"]

P = {
    "Nom" : str(input("Nom : ")),
    "DateNaiss" : {
        "Jour"  : int(input("Jour de naissance : ")),
        "Mois"  : int(input("Mois de naissance : ")),
        "Annee" : int(input("Année de naissance : "))
    }
}

AnneeCourante = int(input("Année courante : "))
Age = AgeApprox(P, AnneeCourante)
print("Âge approximatif :", Age)
```
> Remarque (du PDF) : l'accès à un champ imbriqué se fait en chaînant les crochets : `P["DateNaiss"]["Annee"]` correspond, en algorithmique, à `P . DateNaiss . Annee`.

### Exercice corrigé 1 — Gestion d'une bibliothèque (synthèse)

**Énoncé :** une bibliothèque gère un tableau de N livres. Chaque livre est un enregistrement « Livre » formé de : Titre (Chaîne), Auteur (Chaîne) et Disponible (Booléen).
1) Déclaration algorithmique de « Livre » et du tableau « TabLivres ».
2) Fonction « Rechercher » qui reçoit TabLivres, N et un Titre, et retourne l'indice du livre trouvé (ou -1 si absent).
3) Fonction « Emprunter » qui, si le livre existe et est disponible, met à jour son champ Disponible à Faux, sinon affiche un message d'erreur.
4) Fonction « AfficherDisponibles » qui affiche les titres des livres encore disponibles.

**Déclaration :**
```
Livre = Enregistrement
    Titre : Chaîne
    Auteur : Chaîne
    Disponible : Booléen
Fin
```
T.D.O : `N` (Entier), `TabLivres` (Tableau de N Livre), `Ind` (Entier), `TitreCherche` (Chaîne)

**Python :**
```python
from numpy import *

def Rechercher(TabLivres, N, TitreCherche):
    i = 0
    Ind = -1
    while i < N and Ind == -1:
        if TabLivres[i]["Titre"] == TitreCherche:
            Ind = i
        i = i + 1
    return Ind

def Emprunter(TabLivres, N, TitreCherche):
    Ind = Rechercher(TabLivres, N, TitreCherche)
    if Ind == -1:
        print("Livre introuvable.")
    elif TabLivres[Ind]["Disponible"] == False:
        print("Livre déjà emprunté.")
    else:
        TabLivres[Ind]["Disponible"] = False
        print("Emprunt effectué avec succès.")

def AfficherDisponibles(TabLivres, N):
    for i in range(N):
        if TabLivres[i]["Disponible"] == True:
            print(TabLivres[i]["Titre"])
```
> Remarque (du PDF) : le champ Disponible étant un Booléen, on l'initialise en général à True lors de la saisie, puis on le fait passer à False lors d'un emprunt.

### Exercice corrigé 2 — Enregistrement ELEVE (Nom, Prenom, Moyenne) avec contrôle de saisie

**Énoncé :**
1. Déclarer un enregistrement appelé ELEVE identifié par les champs : Nom (non vide, lettres alphabétiques uniquement), Prenom (non vide, lettres alphabétiques uniquement), Moyenne (comprise entre 0 et 20).
2. Algorithme du sous-programme permettant de remplir les champs de l'enregistrement ELEVE.
3. Algorithme du sous-programme qui affiche les valeurs contenues dans l'enregistrement ELEVE.
4. Programme principal nommé ELEVE_ENR.
5. Implémenter la solution Python.

**Déclaration :**
```
Type ELEVE = Enregistrement
    Nom : Chaîne
    Prenom : Chaîne
    Moyenne : Réel
FinEnregistrement
```

**Fonction Alpha (vérifie que la chaîne ne contient que des majuscules A-Z après conversion) :**
```
Fonction Alpha(ch : Chaîne) : Booléen
Début
    ch ←Majuscule(ch)
    i ←-1
    ok ←Vrai
    TantQue ok ET i < Longueur(ch)-1 Faire
        i ←i + 1
        ok ←("A" <= ch[i] <= "Z")
    FinTantQue
    Retourner(ok)
Fin
```

**Sous-programme Saisir (avec contrôle via Alpha et bornes) :**
```
Procédure Saisir(@ e : ELEVE)
Début
    Répéter
        Ecrire("Nom : ")
        Lire(e.Nom)
    Jusqu'à (e.Nom <> "") ET Alpha(e.Nom)
    Répéter
        Ecrire("Prénom : ")
        Lire(e.Prenom)
    Jusqu'à (e.Prenom <> "") ET Alpha(e.Prenom)
    Répéter
        Ecrire("Moyenne : ")
        Lire(e.Moyenne)
    Jusqu'à (0 <= e.Moyenne <= 20)
Fin
```

**Sous-programme Affiche :**
```
Procédure Affiche(e : ELEVE)
Début
    Ecrire("Nom    : ", e.Nom)
    Ecrire("Prénom : ", e.Prenom)
    Ecrire("Moyenne : ", e.Moyenne)
Fin
```

**Programme principal ELEVE_ENR :**
```
Algorithme principal
Début
    Saisir(e)
    Affiche(e)
Fin
```
T.D.N.T : `ELEVE = Enregistrement { Nom: Chaîne; Prenom: Chaîne; Moyenne: Réel }`
T.D.O : `e` (ELEVE), `Saisir, affiche` (Procédure)

**Implémentation Python :**
```python
def alpha(ch):
    ch = ch.upper()
    i = -1
    ok = True
    while ok and i != len(ch) - 1:
        i += 1
        ok = ord(ch[i]) in range(ord("A"), ord("Z") + 1)
    return ok

def saisir(e):
    e["nom"] = input("Nom : ")
    while len(e["nom"]) == 0 or not alpha(e["nom"]):
        e["nom"] = input("Nom : ")

    e["prenom"] = input("Prénom : ")
    while len(e["prenom"]) == 0 or not alpha(e["prenom"]):
        e["prenom"] = input("Prénom : ")

    e["moyenne"] = float(input("Moyenne : "))
    while not (0 <= e["moyenne"] <= 20):
        e["moyenne"] = float(input("Moyenne : "))

def affiche(e):
    print("Nom     :", e["nom"])
    print("Prénom  :", e["prenom"])
    print("Moyenne :", e["moyenne"])

# Programme principal
e = {"nom": "", "prenom": "", "moyenne": 0.0}
saisir(e)
affiche(e)
```

### Exercice corrigé 3 — Fiche COVID-19 par gouvernorat (NomGov, Numj, NbrP, NbrG)

**Énoncé :** une fiche Covid est formée du nom du gouvernorat et du nombre de cas positifs d'un test COVID19 et du nombre de guérisons pour une journée donnée de l'année :
- **NomGov** : nom du gouvernorat (chaîne alphabétique)
- **Numj** : numéro de jour de l'année (entier entre 1 et 365)
- **NbrP** : nombre de cas positifs (entier naturel)
- **NbrG** : nombre de cas de guérison (entier naturel)

**Travail demandé :** écrire un programme Python qui permet :
1. De remplir un tableau T de taille N (N≤100) par les informations décrites ci-dessus.
2. D'afficher le(s) nom(s) de(s) gouvernorat(s) et le(s) numéro(s) de jour(s) de l'année ayant 0 cas détecté.
3. D'afficher le(s) nom(s) de(s) gouvernorat(s) ayant enregistré la valeur maximale comme cas positif.

**Correction Python complète :**
```python
from numpy import *
# programme covid-19
Fiche = dict(
    NomGov=str,
    Numj=int(),
    NbrP=int(),
    NbrG=int()
)

# saisie taille tableau
def saisie():
    N = int(input("N= "))
    while not (0 < N <= 100):
        N = int(input("N= "))
    return N

# fonction verif (chaîne alphabétique)
def verif(S):
    S = S.upper()
    i = -1
    ok = True
    while ok and i < len(S) - 1:
        i = i + 1
        ok = "A" <= S[i] <= "Z"
        # ok = ord(S[i]) in range(ord("A"), ord("Z") + 1)
    return ok

# module remplissage
def remplir(N):
    T = {}
    for i in range(N):
        # initialisation du dictionnaire au sein du tableau
        T[i] = dict()

        # remplissage du dictionnaire
        T[i]["NomGov"] = input("Nom gov N° " + str(i + 1) + ":")
        while not (verif(T[i]["NomGov"])):
            T[i]["NomGov"] = input("Nom gov N° " + str(i + 1) + ":")

        T[i]["Numj"] = int(input("Numero jour= "))
        while not (1 <= T[i]["Numj"] <= 365):
            T[i]["Numj"] = int(input("Numero jour= "))

        T[i]["NbrP"] = int(input("cas positif= "))
        while not (0 <= T[i]["NbrP"]):
            T[i]["NbrP"] = int(input("cas positif= "))

        T[i]["NbrG"] = int(input("cas gueri= "))
        while not (0 <= T[i]["NbrG"]):
            T[i]["NbrG"] = int(input("cas gueri= "))
    return T

# définition module max
def maxi(T, N):
    m = T[0]["NbrP"]
    for i in range(1, N):
        if m < T[i]["NbrP"]:
            m = T[i]["NbrP"]
    return m

# définition module affiche
def affiche(T, N):
    for i in range(N):
        if T[i]["NbrP"] == 0:
            print("Zero cas dans ", T[i]["NomGov"], " le jour numéro ", T[i]["Numj"])

    print("Gouvernorat ayant la valeur maximale:")
    m = maxi(T, N)
    for i in range(N):
        if T[i]["NbrP"] == m:
            print(T[i]["NomGov"], end=" ")

# PP (programme principal)
N = saisie()
# déclaration tableau de Fiche
T = array([Fiche] * N)
remplir(T, N)
affiche(T, N)
```
