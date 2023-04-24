<!--
 * @Author: camerayuhang
 * @Date: 2023-04-24 11:27:05
 * @LastEditors: camerayuhang
 * @LastEditTime: 2023-04-24 15:41:28
 * @FilePath: \v3ts-cesium-2023\src\App2.vue
 * @Description:
 * 
 * Copyright (c) 2023 by wangyuhang, All Rights Reserved. 
-->
<script setup lang="ts">
import * as Cesium from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css';
import { onMounted, ref } from 'vue';

window.CESIUM_BASE_URL = 'libs/cesium/';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMDRjYzAwNi03NDc3LTQ0YWQtYjEzOC1mZDMwNGI0YjYwMzciLCJpZCI6OTEyODAsImlhdCI6MTY1MDk1MTE3OX0.le9nlEZJur0SDWvxi9Hvd99cd3f61FfZKku4bC_gnsU';
const viewerDivRef = ref<HTMLDivElement>();
// STEP 2 CODE
// Initialize the viewer with Cesium World Terrain.
onMounted(() => {
  const viewer = new Cesium.Viewer(viewerDivRef.value as HTMLElement, {
    terrainProvider: Cesium.createWorldTerrain()
  });
  // Add Cesium OSM Buildings.
  const buildingsTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
  // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
  });

  // STEP 3 CODE
  async function addBuildingGeoJSON() {
    // Load the GeoJSON file from Cesium ion.
    const geoJSONURL = await Cesium.IonResource.fromAssetId(963264);
    // Create the geometry from the GeoJSON, and clamp it to the ground.
    const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
    // Add it to the scene.
    const dataSource = await viewer.dataSources.add(geoJSON);
    // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
    // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
    for (const entity of dataSource.entities.values) {
      if (entity.polygon) {
        entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN as unknown as Cesium.Property;
      }
    }

    // Move the camera so that the polygon is in view.
    viewer.flyTo(dataSource);
  }
  addBuildingGeoJSON();
})


</script>

<template>
  <div id="cesium-viewer" ref="viewerDivRef"></div>
</template>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
}
</style>