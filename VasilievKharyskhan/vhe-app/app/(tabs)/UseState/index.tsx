import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { styles } from "./styles";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Рисование пальцем</Text>
        <Text style={styles.subtitle}>useState для хранения линий</Text>
      </View>

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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Цвет</Text>
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
      </View>

      {/* Brush Size */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Размер кисти: {brushSize}px
        </Text>
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
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.undoButton]}
          onPress={undoLast}
          disabled={paths.length === 0}>
          <Text style={styles.buttonText}>↶ Отменить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={clearCanvas}>
          <Text style={styles.buttonText}>🗑️ Очистить</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Линий нарисовано: {paths.length}
        </Text>
        <Text style={styles.statsText}>
          Точек в текущей линии: {currentPath.length}
        </Text>
      </View>
    </View>
  );
}

