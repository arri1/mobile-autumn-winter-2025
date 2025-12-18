import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { styles } from "./_styles";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

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
        <ThemedText style={styles.title}>Рисование пальцем</ThemedText>
        <ThemedText style={styles.subtitle}>useState для хранения линий</ThemedText>
      </ThemedView>

      {/* Canvas */}
      <GestureDetector gesture={pan}>
        <ThemedView style={[styles.canvas, { height: canvasHeight }]}>
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
        </ThemedView>
      </GestureDetector>

      {/* Color Picker */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Цвет</ThemedText>
        <ThemedView style={styles.colorPicker}>
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
        </ThemedView>
      </ThemedView>

      {/* Brush Size */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Размер кисти: {brushSize}px
        </ThemedText>
        <ThemedView style={styles.brushPicker}>
          {BRUSH_SIZES.map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.brushButton,
                brushSize === size && styles.selectedBrush
              ]}
              onPress={() => setBrushSize(size)}>
              <ThemedView
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
        </ThemedView>
      </ThemedView>

      {/* Controls */}
      <ThemedView style={styles.controls}>
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
      </ThemedView>

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

