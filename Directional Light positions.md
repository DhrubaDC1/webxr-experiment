**Directional Light positions**

| Directional Light Positions |  |  | Result |
| :---: | :---: | :---: | :---: |
| **x** | **y** | **z** |  |
| camera.position.x | 0 | 0 | Front Lighting |
| (-) camera.position.x | 0 | 0 | Back Lighting |
| 0 | camera.position.y | 0 | Top Lighting |
| 0 | (-) camera.position.y | 0 | Bottom Lighting |
| 0 | 0 | camera.position.z | Right Lighting |
| 0 | 0 | (-) camera.position.z | Left Lighting |
| camera.position.x | camera.position.y | 0 | Front/Top Lighting |
| camera.position.x | (-) camera.position.y | 0 | Front/Bottom Lighting |
| (-) camera.position.x | camera.position.y | 0 | Back/Top Lighting |
| (-) camera.position.x | (-) camera.position.y | 0 | Back/Bottom Lighting |
| 0 | camera.position.y | camera.position.z | Right/Top Lighting |
| 0 | camera.position.y | (-) camera.position.z | Left/Top Lighting |
| 0 | (-) camera.position.y | camera.position.z | Right/Bottom Lighting |
| 0 | (-) camera.position.y | (-) camera.position.z | Left/Bottom Lighting |
| camera.position.x | camera.position.y | camera.position.z | Front/Right/Top Lighting |
| camera.position.x | camera.position.y | (-) camera.position.z | Front/Left/Top Lighting |
| camera.position.x | (-) camera.position.y | (-) camera.position.z | Front/Bottom/Left Lighting |
| camera.position.x | (-) camera.position.y | camera.position.z | Front/Bottom/Right Lighting |
| (-) camera.position.x | camera.position.y | camera.position.z | Back/Top/Right Lighting |
| (-) camera.position.x | camera.position.y | (-) camera.position.z | Back/Top/Left Lighting |
| (-) camera.position.x | (-) camera.position.y | camera.position.z | Back/Bottom/Right Lighting |
| (-) camera.position.x | (-) camera.position.y | (-) camera.position.z | Back/Bottom/Left Lighting |

