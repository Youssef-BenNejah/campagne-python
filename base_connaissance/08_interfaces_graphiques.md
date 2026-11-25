# Les interfaces graphiques (PyQt5 / Qt Designer)
*Sources : document_25077 (17).pdf, (18).pdf, (19).pdf, (20).pdf — mathinfo.tn, 3eme SI*

## Principe général

1. On conçoit l'interface visuellement avec **Qt Designer**, en nommant chaque widget (`objectName`) : labels, zones de saisie (Line Edit), boutons (Push Button), etc. Le fichier est enregistré en `.ui` (ex. `form1.ui`).
2. Côté Python, on charge l'interface avec `uic.loadUi("fichier.ui")`, on affiche la fenêtre avec `.show()`, on connecte les événements des widgets (ex. clic sur un bouton) à des fonctions Python, puis on lance la boucle d'événements avec `app.exec()`.

```python
from PyQt5 import QtWidgets, uic

app = QtWidgets.QApplication([])
f = uic.loadUi("form1.ui")
f.show()
f.btn1.clicked.connect(nom_fonction)
app.exec()
```

## 1/2 — Exemple : Pair / Impair

**Interface (`form1.ui`) :**
| Widget | Name |
|---|---|
| Label | text1 ("Nombre") |
| Line Edit | nb1 |
| Push Button | btn1 ("Verifier") |
| Label | res (affiche le résultat, ex. "3 est impair") |

**Logique Python :**
- `f.nb1.text()` récupère le texte saisi.
- `f.btn1.clicked.connect(verif)` relie le clic du bouton à la fonction `verif`.
- `f.res.setText(msg)` met à jour le label de résultat.

**Code complet :**
```python
from PyQt5 import QtWidgets, uic

def pair(a):
    if a % 2 == 0:
        msg = 'pair'
    else:
        msg = 'impair'
    return msg

def verif():
    a = str(f.nb1.text())
    msg = pair(int(a))
    f.res.setText(msg)

app = QtWidgets.QApplication([])
f = uic.loadUi("form1.ui")
f.show()
f.btn1.clicked.connect(verif)
app.exec()
```

## 2/2 — Applications avancées

### Application 1 (Radio Button) — Nombre de solutions d'une équation du second degré
Interface : 3 Radio Buttons (Strictement positif / Null / Strictement negatif pour le signe du discriminant), 1 Push Button ("Nombre de solution"), 1 Label (résultat).

| Signe discriminant | Nombre de solutions |
|---|---|
| Strictement positif | 2 solutions |
| Null | Solution double |
| Strictement négatif | 0 solution |

**Objets Qt Designer :**
| Objet | Type |
|---|---|
| S1 | Radio Button |
| S2 | Radio Button |
| S3 | Radio Button |
| Verif | Push Button |
| Res | Label |

**Script Python :**
```python
from PyQt5 import QtWidgets, uic

def tester():
    if f.S1.isChecked():
        msg = '2 solutions'
    if f.S2.isChecked():
        msg = 'Solution double'
    if f.S3.isChecked():
        msg = '0 solution'
    return msg

def verifier():
    msg = tester()
    f.Res.setText(msg)

app = QtWidgets.QApplication([])
f = uic.loadUi("degres.ui")
f.show()
f.Verif.clicked.connect(verifier)
app.exec()
```

### Application 2 (ComboBox) — même logique via liste déroulante
Modifier l'interface pour utiliser une **Combo Box** (nommée `com`) contenant les 3 choix ("Strictement positif", "Null", "Strictement negatif") au lieu des Radio Buttons.

**Script Python :**
```python
from PyQt5 import QtWidgets, uic

def tester():
    if f.com.currentText() == "Strictement positif":
        msg = "2 solutions"
    if f.com.currentText() == "Null":
        msg = "Solution double"
    if f.com.currentText() == "Strictement negatif":
        msg = "0 solution"
    return msg

def verifier():
    msg = tester()
    f.Res.setText(msg)

app = QtWidgets.QApplication([])
f = uic.loadUi("degres.ui")
f.show()
f.Verif.clicked.connect(verifier)
app.exec()
```

### Application 3 — Formulaire avec validation (Nom, Prénom, Âge, Genre)

**Règles de validation :**
- Nom et Prénom non vides.
- Âge choisi depuis une liste (18 ≤ âge ≤ 22) via ComboBox.
- Genre doit être coché (Radio Button Homme/Femme).

**Widgets (Qt Designer) :**
| Objet | Type |
|---|---|
| afficher | QPushButton |
| com | QComboBox (âge) |
| femme | QRadioButton |
| homme | QRadioButton |
| nom | QLineEdit |
| prenom | QLineEdit |
| label, label_2, label_3, label_4 | QLabel |

En cliquant sur **Afficher**, une boîte de dialogue de confirmation apparaît avec le message, ex. "Saleh Sami 20 ans homme".

**Script Python :**
```python
from PyQt5 import QtWidgets, uic

def tester():
    genre = ""
    age = ""
    if f.com.currentText() == "18":
        age = " 18 ans "
    if f.com.currentText() == "19":
        age = " 19 ans "
    if f.com.currentText() == "20":
        age = " 20 ans "
    if f.com.currentText() == "21":
        age = " 21 ans "
    if f.com.currentText() == "22":
        age = " 22 ans "
    if f.homme.isChecked():
        genre = " homme"
    if f.femme.isChecked():
        genre = " femme"

    msg = f.nom.text() + " " + f.prenom.text() + age + genre
    return msg

def verifier():
    msg = tester()
    QtWidgets.QMessageBox.information(f, "Confirmation", msg)

app = QtWidgets.QApplication([])
f = uic.loadUi("application.ui")
f.show()
f.afficher.clicked.connect(verifier)
app.exec()
```

## Application Interface graphique — Génération de code (ASCII)

**Principe :**
a. Introduire un nom (maximum 6 caractères).
b. Introduire un numéro (chiffres entre 65 et 90).
c. Calculer la somme du code ASCII des deux premiers caractères du nom, puis ajouter le code ASCII du numéro (le convertir en caractère).
s. Afficher le code.

**Exemple :** Nom = "Saleh", Numéro = 89.
- Code ASCII de 'S' = 83, code ASCII de 'a' = 97 → somme = 180.
- Le caractère dont le code ASCII est 89 est 'Y'.
- Code généré : **180Y**

**Widgets Qt Designer :** `nom` (LineEdit), `num` (LineEdit), `btn1` (PushButton "Coder"), `res1` (Label résultat).

**Correction Python :**
```python
from PyQt5 import QtWidgets, uic

def coder(nom, num):
    msg = ''
    if len(nom) < 7:
        msg = 'verifier nom'
    elif num < 65 or num > 90:
        msg = 'verifier num'
    else:
        msg = 'Votre Code est: ' + str(ord(nom[0]) + ord(nom[1])) + chr(num)
    return msg

def verif():
    nom = windows.nom.text()
    num = int(windows.num.text())
    msg = coder(nom, num)
    windows.res1.setText(msg)

app = QtWidgets.QApplication([])
windows = uic.loadUi("form1.ui")
windows.show()
windows.btn1.clicked.connect(verif)
app.exec()
```

## TP3 — Projet graphique N°2 : Calcul du PGCD (interface graphique)

**Énoncé :** créer une interface graphique (Qt Designer) qui permet de saisir deux entiers A et B positifs non nuls et d'afficher leur PGCD, en utilisant la **méthode des différences** (soustractions successives).
Exemples : PGCD(24,18) = PGCD(6,18) = PGCD(6,12) = PGCD(6,6) = 6. PGCD(27,90) = ... = PGCD(9,9) = 9.

**Widgets Qt Designer (fenêtre "pgcd") :**
| Objet | Rôle |
|---|---|
| nb1 | Entier A |
| nb2 | Entier B |
| btn1 | Bouton "Calculer" |
| res | Label résultat ("PGCD est ...") |

**Script Python complet :**
```python
from PyQt5 import QtWidgets, uic

def pgcd(nb1, nb2):
    while nb1 != nb2:
        if nb1 > nb2:
            nb1 = nb1 - nb2
        else:
            nb2 = nb2 - nb1
    return nb1

def tester(nb1, nb2):
    if not (nb1.isdigit()) or int(nb1) <= 0:
        msg = 'Verifier nb1'
    elif not (nb2.isdigit()) or int(nb2) <= 0:
        msg = 'Verifier nb2'
    else:
        msg = pgcd(int(nb1), int(nb2))
    return msg

def play():
    nb1 = f.nb1.text()
    nb2 = f.nb2.text()
    msg = tester(nb1, nb2)
    f.res.setText(str(msg))

app = QtWidgets.QApplication([])
f = uic.loadUi("i4.ui")
f.show()
f.btn1.clicked.connect(play)
app.exec()
```
