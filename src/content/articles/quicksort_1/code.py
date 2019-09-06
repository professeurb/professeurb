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


def chrono(n, f):
    # on trie f fois une liste de n éléments
    t1 = 0.0
    t2 = 0.0
    for _ in range(f):
        l1 = [random.random() for _ in range(n)]
        l2 = l1[:] # deepcopy
        t1 -= time.time()
        _ = pseudo_quicksort(l1)
        t1 += time.time()
        t2 -= time.time()
        _ = quicksort(l2)
        t2 += time.time()
    return t1 / f, t2 / f


def chrono2(n, f):
        # on trie f fois une liste de n éléments
    ts1 = []
    ts2 = []
    for _ in range(f):
        l1 = [random.random() for _ in range(n)]
        l2 = l1[:] # deepcopy
        gc.collect()
        gc.disable()
        t1 = -time.time()
        _ = pseudo_quicksort(l1)
        t1 += time.time()
        ts1.append(t1)
        gc.collect()
        gc.disable()
        t2 = - time.time()
        _ = quicksort(l2)
        t2 += time.time()
        ts2.append(t2)
    return ts1, ts2

# %%


chrono(100, 10000)
# (0.00012252514123916626, 0.00011490355014801026)
chrono(1000, 10000)
# (0.0016969511985778808, 0.00184487886428833)
chrono(10000, 10000)
(0.023769102048873902, 0.0267609299659729)
chrono(100000, 1000)
# (0.29259548282623293, 0.325326274394989)
chrono(1000000, 100)
# (3.978238389492035, 4.016462082862854)
# %%

a = [100, 1000, 10000, 100000, 1000000]
b = [0.00012252514123916626, 0.0016969511985778808,
     0.023769102048873902, 0.29259548282623293, 3.978238389492035]
c = [.00011490355014801026, .00184487886428833, .0267609299659729, .325326274394989, 4.016462082862854]
