import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Svg, { Path } from 'react-native-svg';

type Point = {
  x: number;
  y: number;
};

type DrawingPath = {
  points: Point[];
  color: string;
  width: number;
};

const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
const BRUSH_SIZES = [2, 5, 10, 15, 20];

export default function DrawingApp() {
  const [paths, setPaths] = useState<DrawingPath[]>([]);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasHeight = 250;

  const handleTouchStart = (x: number, y: number) => {
    setIsDrawing(true);
    setCurrentPath([{ x, y }]);
  };

  const handleTouchMove = (x: number, y: number) => {
    if (isDrawing) {
      setCurrentPath(prev => [...prev, { x, y }]);
    }
  };

  const handleTouchEnd = () => {
    if (currentPath.length > 0) {
      setPaths(prev => [...prev, {
        points: currentPath,
        color: selectedColor,
        width: brushSize
      }]);
      setCurrentPath([]);
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  const undoLast = () => {
    setPaths(prev => prev.slice(0, -1));
  };

  const convertPointsToPath = (points: Point[]): string => {
    if (points.length === 0) return '';

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const pan = Gesture.Pan()
    .onStart((event) => {
      handleTouchStart(event.x, event.y);
    })
    .onUpdate((event) => {
      handleTouchMove(event.x, event.y);
    })
    .onEnd(() => {
      handleTouchEnd();
    });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Рисование пальцем</ThemedText>
        <ThemedText style={styles.subtitle}>useState для хранения линий</ThemedText>
      </ThemedView>

      {/* Canvas */}
      <GestureDetector gesture={pan}>
        <View style={[styles.canvas, { height: canvasHeight }]}>
          <Svg width="100%" height="100%" style={styles.svg}>
            {/* Отрисовка всех сохраненных путей */}
            {paths.map((path, index) => (
              <Path
                key={index}
                d={convertPointsToPath(path.points)}
                stroke={path.color}
                strokeWidth={path.width}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {/* Отрисовка текущего пути */}
            {currentPath.length > 0 && (
              <Path
                d={convertPointsToPath(currentPath)}
                stroke={selectedColor}
                strokeWidth={brushSize}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Svg>
        </View>
      </GestureDetector>

      {/* Color Picker */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Цвет</ThemedText>
        <View style={styles.colorPicker}>
          {COLORS.map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColor
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </ThemedView>

      {/* Brush Size */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Размер кисти: {brushSize}px
        </ThemedText>
        <View style={styles.brushPicker}>
          {BRUSH_SIZES.map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.brushButton,
                brushSize === size && styles.selectedBrush
              ]}
              onPress={() => setBrushSize(size)}>
              <View
                style={[
                  styles.brushPreview,
                  {
                    width: size * 2,
                    height: size * 2,
                    borderRadius: size,
                    backgroundColor: selectedColor
                  }
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.undoButton]}
          onPress={undoLast}
          disabled={paths.length === 0}>
          <ThemedText style={styles.buttonText}>↶ Отменить</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={clearCanvas}>
          <ThemedText style={styles.buttonText}>🗑️ Очистить</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <ThemedView style={styles.stats}>
        <ThemedText style={styles.statsText}>
          Линий нарисовано: {paths.length}
        </ThemedText>
        <ThemedText style={styles.statsText}>
          Точек в текущей линии: {currentPath.length}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 14,
  },
  canvas: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginBottom: 16,
    overflow: 'hidden',
  },
  svg: {
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedColor: {
    borderColor: '#007AFF',
    borderWidth: 4,
    transform: [{ scale: 1.1 }],
  },
  brushPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  brushButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedBrush: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  brushPreview: {
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  undoButton: {
    backgroundColor: '#FF9500',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stats: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    opacity: 0.7,
  },
});