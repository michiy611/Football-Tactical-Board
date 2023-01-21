from sklearn.cluster import KMeans
import numpy as np

pallete = {'b': (0, 0, 192),
        'g': (0, 192, 0),
        'r': (192, 0, 0),
        'c': (0, 192, 192),
        'm': (192, 0, 192),
        'y': (192, 192, 0),
        'k': (0, 0, 0),
        'w': (255, 255, 255)}


def detect_color(img):
    """
    KMeansを用いて、色の検出を行う。
    """
    img = img.reshape((img.shape[1]*img.shape[0],3))

    kmeans = KMeans(n_clusters=2)
    s = kmeans.fit(img)

    labels = kmeans.labels_
    centroid = kmeans.cluster_centers_
    labels = list(labels)
    percent=[]
    
    for i in range(len(centroid)):
        j=labels.count(i)
        j=j/(len(labels))
        percent.append(j)

    detected_color = centroid[np.argmin(percent)]
    
    list_of_colors = list(pallete.values())
    assigned_color = closest_color(list_of_colors, detected_color)[0]
    assigned_color = (int(assigned_color[2]), int(assigned_color[1]), int(assigned_color[0]))

    return assigned_color

def closest_color(list_of_colors, color):
    """
    検出された色に最も近い色を、パレットをもとに検索する。
    """
    colors = np.array(list_of_colors)
    color = np.array(color)
    distances = np.sqrt(np.sum((colors-color)**2,axis=1))
    index_of_shortest = np.where(distances==np.amin(distances))
    shortest_distance = colors[index_of_shortest]

    return shortest_distance 