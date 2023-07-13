// Import functions for text type
import textClassification from './text_classification'
import textRegression from './text_regression'
import textAnomaly from './text_anomaly'
import textClustering from './text_clustering'

// Import functions for image type
import imageClassification from './image_classification'
import imageRegression from './image_regression'
import imageAnomaly from './image_anomaly'
import imageClustering from './image_clustering'

// Import functions for audio type
import audioClassification from './audio_classification'
import audioRegression from './audio_regression'
import audioAnomaly from './audio_anomaly'
import audioClustering from './audio_clustering'

// Import functions for video type
import videoClassification from './video_classification'
import videoRegression from './video_regression'
import videoAnomaly from './video_anomaly'
import videoClustering from './video_clustering'

// Import functions for log type
import logClassification from './log_classification'
import logRegression from './log_regression'
import logAnomaly from './log_anomaly'
import logClustering from './log_clustering'

// Import functions for satellite type
import satelliteClassification from './satellite_classification'
import satelliteRegression from './satellite_regression'
import satelliteAnomaly from './satellite_anomaly'
import satelliteClustering from './satellite_clustering'

// Import functions for binary type
import binaryClassification from './binary_classification'
import binaryRegression from './binary_regression'
import binaryAnomaly from './binary_anomaly'
import binaryClustering from './binary_clustering'

function combinedFunction(id) {
  const functionArray = [
    textClassification,
    textRegression,
    textAnomaly,
    textClustering,
    imageClassification,
    imageRegression,
    imageAnomaly,
    imageClustering,
    audioClassification,
    audioRegression,
    audioAnomaly,
    audioClustering,
    videoClassification,
    videoRegression,
    videoAnomaly,
    videoClustering,
    logClassification,
    logRegression,
    logAnomaly,
    logClustering,
    satelliteClassification,
    satelliteRegression,
    satelliteAnomaly,
    satelliteClustering,
    binaryClassification,
    binaryRegression,
    binaryAnomaly,
    binaryClustering,
  ]

  // Call the function at the specified index
  if (id >= 1 && id <= functionArray.length) {
    const index = id - 1
    functionArray[index]()
  } else {
    console.log('ID ERROR')
  }
}
