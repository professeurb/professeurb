import time
import random

# %%


def pseudo_quicksort(l):
    if len(l) <= 1:
        return l # la liste est déjà triée
    pivot = l[0]
    plus_petit = []
    plus_grand = []
    for e in l[1:]:
        if e <= pivot:
            plus_petit.append(e)
        else:
            plus_grand.append(e)
    return pseudo_quicksort(plus_petit) + [pivot] + pseudo_quicksort(plus_grand)


# %%

def quicksort(l):
    def aux(debut, fin):
        # Si debut <= fin + 1, la liste est de longueur au plus 1,
        # elle est déjà triée.
        if fin <= debut + 1:
            return
        # On choisit le pivot,
        pivot = l[debut]
        # Puis on va partager le reste de la liste
        # par rapport à ce pivot.
        i = debut + 1
        j = fin - 1
        while True:
            # Invariant de boucle
            # 1. debut < i, j < fin et i <= j + 1
            # 2. si debut < k < i alors l[k] <= pivot
            # 3. si j < k < fin alors pivot <= l[k]
            while i <= j and l[i] <= pivot:
                i += 1
            # en sortie de boucle, on a soit
            # 1. i == j + 1
            # 2. soit i <= j et l[i] > pivot
            while i <= j and l[j] > pivot:
                j -= 1
            # de même, en sortie de boucle, on a soit
            # 1. i == j + 1
            # 2. soit i <= j et l[j] <= pivot
            # En conclusion, deux cas sont possibles ici :
            # 1. i == j + 1
            # 2. i <= j et l[j] <= pivot < l[i]
            # Dans le premier cas, on a fini de trier
            if (i > j):
                break
            # Sinon, on a donc l[j] <= pivot < l[i]
            #   et donc i < j
            # On échange les deux éléments :
            l[i], l[j] = l[j], l[i]
            # et on continue
            i += 1
            j -= 1
        # On a maintenant
        # 1. i == j + 1
        # 2. debut < k <= j => l[k] <= pivot
        # 3. i <= k < fin => l[k] > pivot
        # On mets le pivot à sa place
        l[debut], l[j] = l[j], l[debut]
        # et on trie les deux côtés séparément.
        aux(debut, j)
        aux(i, fin)
    aux(0, len(l))

# %%

l = [random.random() for _ in range(100000)]

_ = pseudo_quicksort(l)
quicksort(l)
