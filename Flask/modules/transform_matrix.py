def transform_matrix(matrix, p, vid_shape, gt_shape):
  """
  ホモグラフィ行列を用いて変換を行い、変換後の座標を返す。
  """
  p = (p[0]*1280/vid_shape[1], p[1]*720/vid_shape[0])
  px = (matrix[0][0]*p[0] + matrix[0][1]*p[1] + matrix[0][2]) / ((matrix[2][0]*p[0] + matrix[2][1]*p[1] + matrix[2][2]))
  py = (matrix[1][0]*p[0] + matrix[1][1]*p[1] + matrix[1][2]) / ((matrix[2][0]*p[0] + matrix[2][1]*p[1] + matrix[2][2]))

  p_after = (int(px) , int(py))

  return p_after