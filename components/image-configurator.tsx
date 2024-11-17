"use client";

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, SlidersHorizontal, Palette } from 'lucide-react';

interface ImageConfig {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sepia: number;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop";

export default function ImageConfigurator() {
  const [config, setConfig] = useState<ImageConfig>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    sepia: 0,
  });

  const updateConfig = (key: keyof ImageConfig, value: number[]) => {
    setConfig(prev => ({ ...prev, [key]: value[0] }));
  };

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${config.brightness}%)
        contrast(${config.contrast}%)
        saturate(${config.saturation}%)
        blur(${config.blur / 10}px)
        sepia(${config.sepia}%)
      `,
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={DEFAULT_IMAGE}
              alt="Configurable image"
              className="w-full h-full object-cover transition-all duration-300"
              style={getFilterStyle()}
            />
          </div>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="adjustments" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="adjustments" className="w-1/2">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Adjustments
              </TabsTrigger>
              <TabsTrigger value="filters" className="w-1/2">
                <Palette className="w-4 h-4 mr-2" />
                Filters
              </TabsTrigger>
            </TabsList>

            <TabsContent value="adjustments" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brightness</label>
                  <Slider
                    value={[config.brightness]}
                    min={0}
                    max={200}
                    step={1}
                    onValueChange={(value) => updateConfig('brightness', value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contrast</label>
                  <Slider
                    value={[config.contrast]}
                    min={0}
                    max={200}
                    step={1}
                    onValueChange={(value) => updateConfig('contrast', value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Saturation</label>
                  <Slider
                    value={[config.saturation]}
                    min={0}
                    max={200}
                    step={1}
                    onValueChange={(value) => updateConfig('saturation', value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="filters" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blur</label>
                  <Slider
                    value={[config.blur]}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={(value) => updateConfig('blur', value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sepia</label>
                  <Slider
                    value={[config.sepia]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => updateConfig('sepia', value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2" />
              Current Settings
            </h3>
            <pre className="text-xs bg-gray-100 p-2 rounded">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}