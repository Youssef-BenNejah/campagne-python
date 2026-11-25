# Série (Les enregistrements) — 5 exercices corrigés
*Source : document_25077 (11).pdf — Classe : 3 SI (programmation), mathinfo.tn*

## Exercice 1 — Enregistrement ELEVE (nom, prénom, moyenne)

**Énoncé :**
1. Écrire un enregistrement appelé élève qui a pour champs : nom, prénom et moyenne.
2. Écrire un sous-programme qui permet de remplir les champs de cet enregistrement.
3. Écrire un sous-programme qui affiche ces champs.
4. Écrire le programme principal.
5. En déduire le programme Python de ce problème.

**Correction :**

1) Déclaration de l'enregistrement :
```
Type ELEVE = Enregistrement
    Nom : Chaîne
    Prenom : Chaîne
    Moyenne : Réel
FinEnregistrement
```

2) Sous-programme Remplir :
```
Procédure Remplir(@e : ELEVE)
Début
    Ecrire("Nom : ")
    Lire(e.Nom)
    Ecrire("Prénom : ")
    Lire(e.Prenom)
    Ecrire("Moyenne : ")
    Lire(e.Moyenne)
Fin
```

3) Sous-programme Afficher :
```
Procédure Afficher(e : ELEVE)
Début
    Ecrire("Nom : ", e.Nom)
    Ecrire("Prénom : ", e.Prenom)
    Ecrire("Moyenne : ", e.Moyenne)
Fin
```

4) Programme principal :
```
Algorithme principal
Début
    Remplir(e)
    Afficher(e)
Fin
```
T.D.N.T : `ELEVE = Enregistrement { Nom: Chaîne; Prenom: Chaîne; Moyenne: Réel }`
T.D.O : `e` (ELEVE), `Remplir, Afficher` (Procédure)

5) Implémentation Python :
```python
def remplir(e):
    e["nom"] = input("Nom : ")
    e["prenom"] = input("Prénom : ")
    e["moyenne"] = float(input("Moyenne : "))

def afficher(e):
    print("Nom     :", e["nom"])
    print("Prénom  :", e["prenom"])
    print("Moyenne :", e["moyenne"])

# Programme principal
e = {"nom": "", "prenom": "", "moyenne": 0.0}
remplir(e)
afficher(e)
```

## Exercice 2 — Enregistrement JOUEUR (nom, score) et fonction Gagnant

**Énoncé :** Écrire un enregistrement d'un joueur contenant les champs suivants : Nom (chaîne de caractères), Score (entier).
- Créer deux joueurs j1 et j2
- Déterminer le joueur gagnant (le gagnant est celui qui a le score le plus élevé)

**Correction :**

1) Déclaration de l'enregistrement :
```
Type JOUEUR = Enregistrement
    Nom : Chaîne
    Score : Entier
FinEnregistrement
```

2) Sous-programme Saisir :
```
Procédure Saisir(@j : JOUEUR)
Début
    Ecrire("Nom : ")
    Lire(j.Nom)
    Ecrire("Score : ")
    Lire(j.Score)
Fin
```

3) Fonction Gagnant :
```
Fonction Gagnant(j1, j2 : JOUEUR) : JOUEUR
Début
    Si j1.Score > j2.Score Alors
        Retourner(j1)
    Sinon
        Retourner(j2)
    FinSi
Fin
```

4) Programme principal :
```
Algorithme principal
Début
    Saisir(j1)
    Saisir(j2)
    g ←Gagnant(j1,j2)
    Ecrire("Le gagnant est : ", g.Nom)
Fin
```
T.D.N.T : `JOUEUR = Enregistrement { Nom: Chaîne; Score: Entier }`
T.D.O : `j1, j2, g` (JOUEUR), `Saisir` (Procédure), `Gagnant` (Fonction)

5) Implémentation Python :
```python
def saisir(j):
    j["nom"] = input("Nom : ")
    j["score"] = int(input("Score : "))

def gagnant(j1, j2):
    if j1["score"] > j2["score"]:
        return j1
    else:
        return j2

# Programme principal
j1 = {"nom": "", "score": 0}
j2 = {"nom": "", "score": 0}
saisir(j1)
saisir(j2)
g = gagnant(j1, j2)
print("Le gagnant est :", g["nom"])
```

## Exercice 3 — Tableau d'enregistrements ELEVE (nom, classe, moyenne) et recherche du maximum

**Énoncé :** Remplir un tableau de n élèves (2 ≤ n ≤ 20), chaque élève étant un enregistrement avec les champs : nom (chaîne), classe (chaîne), moyenne (réel). Afficher le nom et la classe de l'élève qui a la moyenne maximale.

**Correction :**

1) Déclaration de l'enregistrement :
```
Type ELEVE = Enregistrement
    Nom : Chaîne
    Classe : Chaîne
    Moyenne : Réel
FinEnregistrement
```

2) Sous-programme Saisir_N (saisie contrôlée de n) :
```
Procédure Saisir_N(@n : Entier)
Début
    Répéter
        Ecrire("n : ")
        Lire(n)
    Jusqu'à (2 <= n <= 20)
Fin
```

3) Sous-programme Remplir :
```
Procédure Remplir(@T : Tableau[1..20] d'ELEVE, n : Entier)
Début
    Pour i de 1 à n Faire
        Ecrire("Nom : ")
        Lire(T[i].Nom)
        Ecrire("Classe : ")
        Lire(T[i].Classe)
        Ecrire("Moyenne : ")
        Lire(T[i].Moyenne)
    FinPour
Fin
```

4) Fonction Indice_Max :
```
Fonction Indice_Max(T : Tableau[1..20] d'ELEVE, n : Entier) : Entier
Début
    imax ←1
    Pour i de 2 à n Faire
        Si T[i].Moyenne > T[imax].Moyenne Alors
            imax ←i
        FinSi
    FinPour
    Retourner(imax)
Fin
```

5) Programme principal :
```
Algorithme principal
Début
    Saisir_N(n)
    Remplir(T,n)
    im ←Indice_Max(T,n)
    Ecrire("Nom : ", T[im].Nom, " Classe : ", T[im].Classe)
Fin
```
T.D.N.T : `ELEVE = Enregistrement { Nom: Chaîne; Classe: Chaîne; Moyenne: Réel }`
T.D.O : `T` (Tableau[1..20] d'ELEVE), `n, im` (Entier), `Saisir_N, Remplir` (Procédure), `Indice_Max` (Fonction)

6) Implémentation Python :
```python
def saisir_n():
    n = int(input("n : "))
    while not (2 <= n <= 20):
        n = int(input("n : "))
    return n

def remplir(n):
    T = {}
    for i in range(n):
        T[i] = {"nom": str(), "classe": str(), "moyenne": float()}
        e = {}
        e["nom"] = input("Nom : ")
        e["classe"] = input("Classe : ")
        e["moyenne"] = float(input("Moyenne : "))
        T[i] = e
    return T

def indice_max(T, n):
    imax = 0
    for i in range(1, n):
        if T[i]["moyenne"] > T[imax]["moyenne"]:
            imax = i
    return imax

# Programme principal
n = saisir_n()
T = remplir(n)
im = indice_max(T, n)
print("Nom :", T[im]["nom"], "Classe :", T[im]["classe"])
```

## Exercice 4 — Site Web de rencontres : type CLIENT et regroupement par loisir

**Énoncé :** Un site Web de rencontre met en relation ses clients en fonction de leurs loisirs (sport ou jardinage).
1. Écrire la déclaration d'un type Client (identifiant entier, adresse mail, loisir).
2. Remplir un tableau de clients.
3. Regrouper les clients par loisir commun dans deux autres tableaux, puis les afficher.

**Correction :**

1) Déclaration du type CLIENT :
```
Type CLIENT = Enregistrement
    Id : Entier
    Mail : Chaîne
    Loisir : Chaîne
FinEnregistrement
```

2) Sous-programme Remplir :
```
Procédure Remplir(@T : Tableau[1..N] de CLIENT, n : Entier)
Début
    Pour i de 1 à n Faire
        Ecrire("Identifiant : ")
        Lire(T[i].Id)
        Ecrire("Mail : ")
        Lire(T[i].Mail)
        Répéter
            Ecrire("Loisir (Sport/Jardinage) : ")
            Lire(T[i].Loisir)
        Jusqu'à (T[i].Loisir = "Sport") OU (T[i].Loisir = "Jardinage")
    FinPour
Fin
```

3) Sous-programme Regrouper :
```
Procédure Regrouper(T : Tableau[1..N] de CLIENT, n : Entier, @TS : Tableau[1..N] de CLIENT, @nS : Entier, @TJ : Tableau[1..N] de CLIENT, @nJ : Entier)
Début
    nS ←0
    nJ ←0
    Pour i de 1 à n Faire
        Si T[i].Loisir = "Sport" Alors
            nS ←nS + 1
            TS[nS] ←T[i]
        Sinon
            nJ ←nJ + 1
            TJ[nJ] ←T[i]
        FinSi
    FinPour
Fin
```

4) Sous-programme Afficher :
```
Procédure Afficher(T : Tableau[1..N] de CLIENT, n : Entier)
Début
    Pour i de 1 à n Faire
        Ecrire(T[i].Id, " - ", T[i].Mail)
    FinPour
Fin
```

5) Programme principal :
```
Algorithme principal
Début
    Ecrire("Nombre de clients : ")
    Lire(n)
    Remplir(T,n)
    Regrouper(T,n,TS,nS,TJ,nJ)
    Ecrire("Clients Sport :")
    Afficher(TS,nS)
    Ecrire("Clients Jardinage :")
    Afficher(TJ,nJ)
Fin
```
T.D.N.T : `CLIENT = Enregistrement { Id: Entier; Mail: Chaîne; Loisir: Chaîne }`
T.D.O : `T, TS, TJ` (Tableau[1..N] de CLIENT), `n, nS, nJ` (Entier), `Remplir, Regrouper, Afficher` (Procédure)

6) Implémentation Python :
```python
def remplir(n):
    T = {}
    for i in range(n):
        T[i] = {"id": int(), "mail": str(), "loisir": str()}
        c = {}
        c["id"] = int(input("Identifiant : "))
        c["mail"] = input("Mail : ")
        c["loisir"] = input("Loisir (Sport/Jardinage) : ")
        while c["loisir"] not in ("Sport", "Jardinage"):
            c["loisir"] = input("Loisir (Sport/Jardinage) : ")
        T[i] = c
    return T

def regrouper(T, n):
    TS = {}
    TJ = {}
    j = -1
    s = -1
    for i in range(n):
        if T[i]["loisir"] == "Sport":
            s = s + 1
            TS[s] = {"id": int(), "mail": str(), "loisir": str()}
            TS[s] = T[i]
        else:
            j = j + 1
            TJ[j] = {"id": int(), "mail": str(), "loisir": str()}
            TJ[j] = T[i]
    return TS, TJ

def afficher(T):
    for i in range(len(T)):
        print(T[i]["id"], "-", T[i]["mail"])

# Programme principal
n = int(input("Nombre de clients : "))
T = remplir(n)
TS, TJ = regrouper(T, n)
print("Clients Sport :")
afficher(TS)
print("Clients Jardinage :")
afficher(TJ)
```

## Exercice 5 — ADHERENT : bonus en heures selon l'ancienneté

**Énoncé :** Le gérant d'une salle de sport offre un bonus en heures d'entraînement gratuites selon l'ancienneté de l'adhérent (en mois par rapport à la date du jour). Une heure est offerte par mois d'ancienneté, mais le bonus n'est pris en compte que si l'ancienneté **dépasse 5 ans**. Informations d'un adhérent :
- Numéro d'abonnement (5 chiffres)
- Catégorie (A : Adulte, J : Junior, E : Enfant)
- Année d'adhésion (entre 2000 et 2021)
- Mois d'adhésion (entre 1 et 12)

**Exemple :** adhérent avec année d'adhésion 2015, mois 1 (janvier) → ancienneté de six ans et deux mois par rapport au 10/03/2021, soit 74 mois (12*6+2) → bonus de 74 heures.

**Travail demandé :**
- Saisir un entier N (2 ≤ N ≤ 30) représentant le nombre d'adhérents.
- Remplir un tableau T de N adhérents.
- Afficher les numéros d'abonnements des adhérents ayant une ancienneté supérieure à 5 ans et appartenant à une catégorie donnée, ainsi que leurs bonus correspondants (date du jour : 10/03/2021).

**Correction :**

1) Déclaration du type ADHERENT :
```
Type ADHERENT = Enregistrement
    NumAbonnement : Entier
    Categorie : Caractère
    AnneeAdhesion : Entier
    MoisAdhesion : Entier
FinEnregistrement
```

2) Fonction Anciennete (en mois, par rapport au 10/03/2021) :
```
Fonction Anciennete(a : ADHERENT) : Entier
Début
    Anc ←(2021 - a.AnneeAdhesion) * 12 + (3 - a.MoisAdhesion)
    Retourner(Anc)
Fin
```

3) Fonction Bonus :
```
Fonction Bonus(a : ADHERENT) : Entier
Début
    Si Anciennete(a) > 60 Alors
        Retourner(Anciennete(a))
    Sinon
        Retourner(0)
    FinSi
Fin
```

4) Sous-programme Saisir (saisie contrôlée) :
```
Procédure Saisir(@a : ADHERENT)
Début
    Répéter
        Ecrire("Numéro d'abonnement : ")
        Lire(a.NumAbonnement)
    Jusqu'à (10000 <= a.NumAbonnement <= 99999)
    Répéter
        Ecrire("Catégorie (A/J/E) : ")
        Lire(a.Categorie)
    Jusqu'à (a.Categorie = "A") OU (a.Categorie = "J") OU (a.Categorie = "E")
    Répéter
        Ecrire("Année d'adhésion : ")
        Lire(a.AnneeAdhesion)
    Jusqu'à (2000 <= a.AnneeAdhesion <= 2021)
    Répéter
        Ecrire("Mois d'adhésion : ")
        Lire(a.MoisAdhesion)
    Jusqu'à (1 <= a.MoisAdhesion <= 12)
Fin
```

5) Sous-programme Remplir :
```
Procédure Remplir(@T : Tableau[1..30] d'ADHERENT, n : Entier)
Début
    Pour i de 1 à n Faire
        Saisir(T[i])
    FinPour
Fin
```

6) Sous-programme Afficher_Bonus :
```
Procédure Afficher_Bonus(T : Tableau[1..30] d'ADHERENT, n : Entier, cat : Caractère)
Début
    Pour i de 1 à n Faire
        Si (T[i].Categorie = cat) ET (Anciennete(T[i]) > 60) Alors
            Ecrire(T[i].NumAbonnement, " -> Bonus : ", Bonus(T[i]))
        FinSi
    FinPour
Fin
```

7) Programme principal :
```
Algorithme principal
Début
    Répéter
        Ecrire("N : ")
        Lire(n)
    Jusqu'à (2 <= n <= 30)
    Remplir(T,n)
    Ecrire("Catégorie : ")
    Lire(cat)
    Afficher_Bonus(T,n,cat)
Fin
```
T.D.N.T : `ADHERENT = Enregistrement { NumAbonnement: Entier; Categorie: Caractère; AnneeAdhesion: Entier; MoisAdhesion: Entier }`
T.D.O : `T` (Tableau[1..30] d'ADHERENT), `n, i` (Entier), `cat` (Caractère), `Saisir, Remplir, Afficher_Bonus` (Procédure), `Anciennete, Bonus` (Fonction)

8) Implémentation Python :
```python
def anciennete(a):
    return (2021 - a["annee"]) * 12 + (3 - a["mois"])

def bonus(a):
    if anciennete(a) > 60:
        return anciennete(a)
    else:
        return 0

def saisir():
    a = {}
    a["num"] = int(input("Numéro d'abonnement : "))
    while not (10000 <= a["num"] <= 99999):
        a["num"] = int(input("Numéro d'abonnement : "))
    a["categorie"] = input("Catégorie (A/J/E) : ")
    while a["categorie"] not in ("A", "J", "E"):
        a["categorie"] = input("Catégorie (A/J/E) : ")
    a["annee"] = int(input("Année d'adhésion : "))
    while not (2000 <= a["annee"] <= 2021):
        a["annee"] = int(input("Année d'adhésion : "))
    a["mois"] = int(input("Mois d'adhésion : "))
    while not (1 <= a["mois"] <= 12):
        a["mois"] = int(input("Mois d'adhésion : "))
    return a

def remplir(n):
    T = {}
    for i in range(n):
        T[i] = {"num": int(), "categorie": str(), "annee": int(), "mois": int()}
        T[i] = saisir()
    return T

def afficher_bonus(T, n, cat):
    for i in range(n):
        if T[i]["categorie"] == cat and anciennete(T[i]) > 60:
            print(T[i]["num"], "-> Bonus :", bonus(T[i]))

# Programme principal
n = int(input("N : "))
while not (2 <= n <= 30):
    n = int(input("N : "))
T = remplir(n)
cat = input("Catégorie : ")
afficher_bonus(T, n, cat)
```
