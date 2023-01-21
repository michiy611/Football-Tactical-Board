# 画像から平面上の座標を算出、json形式で返却

from elements.perspective_transform import Perspective_Transform
from modules.yolov5 import detect
from modules.color_detection import detect_color
from modules.transform_matrix import transform_matrix
# from yolov5.utils.plots import plot_one_box
# from elements.deep_sort import DEEPSORT


import json

import torch
import os
import cv2
import numpy as np
import sys
import csv

# video = 'test.mp4'
# video = 'Spain_Germany.mp4'

def getPos(filename):
  # detector = YOLO('weights/best.pt', 0.5, 0.5)

  perspective_transform = Perspective_Transform()

  # img = filename
  img = cv2.imread(filename)

  img_tmp =  img

  img_copy = img.copy()
  yoloOutput = detect(img)
  # yoloOutput = detector.detect(img)

  M, warped_image = perspective_transform.homography_matrix(img_copy)

  h, w, _ = img.shape

  if yoloOutput:
    data = []

    for _, obj in enumerate(yoloOutput):
      xyxy = [obj['bbox'][0][0], obj['bbox'][0][1], obj['bbox'][1][0], obj['bbox'][1][1]]
      x_center = (xyxy[0] + xyxy[2]) / 2 
      y_center = xyxy[3]

      cv2.circle(img_tmp, (x_center, y_center), 10, (255, 0, 0), -1)
      
      if obj['label'] == 'player':
        coords = transform_matrix(M, (x_center, y_center), (h, w), (640, 384))
        # coords = transform_matrix(M, (x_center, y_center), (h, w), (115, 74))
        
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
        # coords = transform_matrix(M, (x_center, y_center), (h, w), (115, 74))
        pos = {'label': 'ball',
                'color': 'rgb(0, 0, 0)',
                'x': coords[0],
                'y': coords[1]
              }
      
      data.append(pos)
    
    cv2.imwrite('./uploads/detect_test.png', img_tmp)

  return data

if __name__ == '__main__':
  result = getPos('test_frame.jpg')
  print(result)