from elements.perspective_transform import Perspective_Transform
from modules.yolov5 import detect
from modules.color_detection import detect_color
from modules.transform_matrix import transform_matrix

import cv2
import numpy as np

def getPos(filename):
  """
  1. 人物とボールの検出
  2. 人物の色検出
  3. ホモグラフィ行列を用いて座標を変換

  [{
    'label': ラベル、['player' | 'ball'],
    'color': rgb値の文字列,
    'x': x座標,
    'y': y座標
  }, {}, {}, ... {}]

  """

  perspective_transform = Perspective_Transform()

  img = cv2.imread(filename)

  img_tmp =  img

  img_copy = img.copy()
  yoloOutput = detect(img)

  M, warped_image = perspective_transform.homography_matrix(img_copy)
  # print('射影変換行列 : ', M)
  cv2.imwrite('./uploads/perspective_test.png', warped_image)

  h, w, _ = img.shape

  warped_image = cv2.resize(warped_image,(640,384))

  if yoloOutput:
    data = []

    for _, obj in enumerate(yoloOutput):
      xyxy = [obj['bbox'][0][0], obj['bbox'][0][1], obj['bbox'][1][0], obj['bbox'][1][1]]
      x_center = (xyxy[0] + xyxy[2]) / 2 
      y_center = xyxy[3]

      # cv2.circle(img_tmp, (int(x_center), int(y_center)), 10, (255, 0, 0), -1)
      
      if obj['label'] == 'player':
        coords = transform_matrix(M, (x_center, y_center), (h, w), (640, 384))
        
        cv2.circle(warped_image, (int(coords[0]*640/115), int(coords[1]*384/75)), 5, (255, 0, 0), -1)

        try:
          color = detect_color(img_copy[xyxy[1]:xyxy[3], xyxy[0]:xyxy[2]])
          pos = {'label': 'player',
                 'color': 'rgb(' + str(color[0]) + ', ' + str(color[1]) + ', ' + str(color[2]) + ')',
                 'x': coords[0],
                 'y': coords[1]
                }
          
        except:
          pass

      elif obj['label'] == 'ball':
        coords = transform_matrix(M, (x_center, y_center), (h, w), (640, 384))
        pos = {'label': 'ball',
                'color': 'rgb(255, 255, 0)',
                'x': coords[0],
                'y': coords[1]
              }
      
      data.append(pos)
    
    # cv2.imwrite('./uploads/detect_test.png', img_tmp)
    cv2.imwrite('./uploads/warped_detect.png', warped_image)

  return data

if __name__ == '__main__':
  result = getPos('test_frame.jpg')
  print(result)