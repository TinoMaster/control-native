import { ScrollView, StyleProp, ViewStyle } from "react-native";

interface MyScrollViewProps {
  readonly children: React.ReactNode;
  readonly style?: StyleProp<ViewStyle>;
  readonly onEndReached?: () => void;
  readonly onEndReachedThreshold?: number;
}

export const MyScrollView = ({ 
  children, 
  style, 
  onEndReached, 
  onEndReachedThreshold = 0.2 
}: MyScrollViewProps) => {
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      className="flex-1" 
      style={style}
      onScroll={({ nativeEvent }) => {
        if (!onEndReached) return;
        
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = contentSize.height * onEndReachedThreshold;
        
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
          onEndReached();
        }
      }}
      scrollEventThrottle={16}
    >
      {children}
    </ScrollView>
  );
};
