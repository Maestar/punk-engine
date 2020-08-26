/********************TEMP DATA*********************
*********temporary data for testing,***************
*******eventually move this to json ***************
*******and introduce a json loader/pasrer**********
*/

const data = {
  destinationMap: {
    scene1: {
      up: "scene2",
      down: "scene3",
      right: "scene5",
      left: "scene4",
    },
    scene2: {
      up: null,
      down: "scene1",
      right: null,
      left: null,
    },
    scene3: {
      up: "scene1",
      down: null,
      right: null,
      left: null,
    },
  },
  layoutData: {
    scene1: {
      background: 0,
      up: {
        left: 250,
        top: 50,
        visible: true,
      },
      down: {
        left: 250,
        top: 200,
        visible: true,
      },
      right: {
        left: 400,
        top: 150,
        visible: true,
      },
      left: {
        left: 100,
        top: 150,
        visible: true,
      },
      interactable_visible_count: 3,
      interactable_visible: {
        0: {
          left: 150,
          top: 230,
          type: "talk",
          hiddenID: 0,
        },
        1: {
          left: 250,
          top: 130,
          type: "talk",
          hiddenID: 1,
        },
        2: {
          left: 220,
          top: 170,
          type: "talk",
          hiddenID: 2,
        },
      },
      interactable_hidden_count: 3,
      interactable_hidden: {
        0: {
          left: 150,
          top: 230,
          type: "talk",
          script: "scene1_0",
        },
        1: {
          left: 250,
          top: 130,
          type: "talk",
          script: "scene1_1",
        },
        2: {
          left: 220,
          top: 170,
          type: "talk",
          script: "scene1_2",
        },
      },
    },
    scene2: {
      background: 1,
      up: {
        visible: false,
      },
      down: {
        left: 250,
        top: 200,
        visible: true,
      },
      right: {
        visible: false,
      },
      left: {
        visible: false,
      },
      interactable_visible_count: 2,
      interactable_visible: {
        0: {
          left: 134,
          top: 270,
          type: "talk",
          hiddenID: 0,
        },
        1: {
          left: 400,
          top: 120,
          type: "talk",
          hiddenID: 1,
        },
      },
      interactable_hidden_count: 2,
      interactable_hidden: {
        0: {
          left: 134,
          top: 270,
          type: "talk",
          script: "scene2_0",
        },
        1: {
          left: 400,
          top: 120,
          type: "talk",
          script: "scene2_1",
        },
      },
    },
    scene3: {
      background: 1,
      up: {
        left: 250,
        top: 50,
        visible: true,
      },
      down: {
        visible: false,
      },
      right: {
        visible: false,
      },
      left: {
        visible: false,
      },
      interactable_visible_count: 1,
      interactable_visible: {
        0: {
          left: 350,
          top: 110,
          type: "talk",
          hiddenID: 0,
        },
      },
      interactable_hidden_count: 1,
      interactable_hidden: {
        0: {
          left: 350,
          top: 110,
          type: "talk",
          script: "scene3_0",
        },
      },
    },
  },
  dialogueData: {
    'scene1_0': 'This is some test Dialogue.',
    'scene1_1': 'This is some test dialogue\nThat is multilined.',
    'scene1_2': 'haha almost forgot\nthis\none.',
    'scene2_0': 'This is scene 2',
    'scene2_1': 'boy howdy,\ndont forget to add this dialogue lines to the data',
    'scene3_0': 'lets make sure scene three works\nalright?',
  }
};

/******DATA CREATION
 * splitting out all the data from TEMP DATA into variables.
 * creating all the static variables that will hold fabric objects.
 * creating the canvas.
 */
const destinationMap = data.destinationMap;
const layoutData = data.layoutData;
const dialogueData = data.dialogueData;
let currentScene = "scene1";
let currentInteractables = [];
let currentHiddenInteractables = [];

let imageURLS = [
  "backgrounds/test.png",
  "backgrounds/test2.png",
  "sprites/up.png",
  "sprites/down.png",
  "sprites/left.png",
  "sprites/right.png",
  "sprites/talk.png",
  "sprites/talkbox.png",
];
let images = [];
let imagesCounter = 0;

let BG_1, BG_2, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TALK, TALKBOX;
let bgArray = [];
let arrowArray = [];
const canvas = new fabric.Canvas("game", { selection: false });

/**LOADING BLOCK
 *
 * startLoading: accepts a function to call when it's complete.
 * iterates through all the urls in the imageURLS array
 * gives them on onload to check off they've been loaded.
 * assign the source to the img url in the imageURL array pos it's iterating on.
 *
 * loadComplete: The callback startLoading calls when it's loaded all the images.
 * Takes all those images created and put into the images array and creates new fabricJS
 * objects with them.
 *
 * Calls the setup block when completed.
 */
function startLoading(callBackFunc) {
  console.log("startloading");
  for (let i = 0; i < imageURLS.length; i++) {
    let img = new Image();
    images.push(img);
    img.onload = () => {
      imagesCounter++;
      console.log(imagesCounter);
      if (imagesCounter >= imageURLS.length) {
        callBackFunc();
      }
    };

    img.onerror = () => {
      alert("image load failed");
    };
    img.src = imageURLS[i];
  }
}

function loadComplete() {
  console.log("loadcomplete");
  //TODO: put these variables in an array and then iterate over both arrays for assignment
  //so that the only thing I have to add is the variable name to array and image url to urls
  BG_1 = new fabric.Image(images[0]);
  bgArray.push(BG_1);
  BG_2 = new fabric.Image(images[1]);
  bgArray.push(BG_2);
  UP_ARROW = new fabric.Image(images[2]);
  arrowArray.push(UP_ARROW);
  DOWN_ARROW = new fabric.Image(images[3]);
  arrowArray.push(DOWN_ARROW);
  LEFT_ARROW = new fabric.Image(images[4]);
  arrowArray.push(LEFT_ARROW);
  RIGHT_ARROW = new fabric.Image(images[5]);
  arrowArray.push(RIGHT_ARROW);
  TALK = new fabric.Image(images[6]);
  TALKBOX = new fabric.Image(images[7]);

  setup();
}
/**SETUP BLOCK
 *
 * setup: currently manually places everything and assigns some default needs for the
 * fabricJS objects. Adds them to the canvas.
 *
 * TODO:// should pull all this data from the JSON (position/selectable/ect)
 *        should add things to an array where they're iterated over and added to the canvas that way.
 *
 * calls the interactsable drawing functions.
 */
function setup() {
  console.log("setup");
  canvas.setBackgroundImage(BG_1);

  UP_ARROW.set({
    left: 250,
    top: 50,
    selectable: false,
    hoverCursor: "pointer",
  }).on("mouseup", () => {
    changeScene("up");
  });
  canvas.add(UP_ARROW);

  DOWN_ARROW.set({
    left: 250,
    top: 200,
    selectable: false,
    hoverCursor: "pointer",
  }).on("mouseup", () => {
    changeScene("down");
  });
  canvas.add(DOWN_ARROW);

  RIGHT_ARROW.set({
    left: 400,
    top: 150,
    selectable: false,
    hoverCursor: "pointer",
  }).on("mouseup", () => {
    changeScene("right");
  });
  canvas.add(RIGHT_ARROW);

  LEFT_ARROW.set({
    left: 100,
    top: 150,
    selectable: false,
    hoverCursor: "pointer",
  }).on("mouseup", () => {
    changeScene("left");
  });
  canvas.add(LEFT_ARROW);

  TALK.set({
    selectable: false,
    hoverCursor: "pointer",
  });

  //HEY NACHTE: THESE PROPERTIES ARE POSSIBLY REDUNDANT SINCE WE SET THE GROUP PROPERTIES THAT OVERRIDE THIS IN
  //DRAWHIDDENINTERACTABLES
  TALKBOX.set({
    selectable: false,
    hoverCursor: "pointer",
  });

  //CONSOLE LOG ALERTS SO WE CAN SEE WHATS GETTING DRAWN AND REMOVED
  canvas.on('object:removed', function (object) {
    console.warn(`REMOVED ${object}`);
  });
  canvas.on('object:added', function (object) {
    console.warn(`ADDED: ${object}`);
  })

  drawSceneHiddenInteractables("scene1");
  drawSceneInteractables("scene1");
  canvas.requestRenderAll();
}

/**SCENE CHANGE BLOCK
 * changeScene: accepts the direction you went, so it knows what scene to pull from the JSON
 * updates the navigation arrows destinations,
 * removes all the old hidden interactable objects -> draws the new ones.
 * removes all visible interactable objects -> draws the new ones.
 * rerenders the scene
 *
 * updateNavigation: accepts the scene it needs to update navigation for.
 * pulls the background and sets it from the scene
 * updates all the direction objects.
 * sets the current scene to the new scene.
 *
 */
function changeScene(direction) {
  let nextScene = destinationMap[currentScene][direction];
  console.log(`next Scene: ${nextScene}`);
  updateNavigation(nextScene);
  removeInteractables("hidden");
  drawSceneHiddenInteractables(nextScene);
  console.log(`current hidden: ${currentHiddenInteractables}`);
  removeInteractables("visible");
  drawSceneInteractables(nextScene);
  console.log(`current shown: ${currentInteractables}`);
  canvas.requestRenderAll();
}

function updateNavigation(scene) {
  canvas.setBackgroundImage(bgArray[layoutData[scene].background]);
  UP_ARROW.set(layoutData[scene].up);
  DOWN_ARROW.set(layoutData[scene].down);
  RIGHT_ARROW.set(layoutData[scene].right);
  LEFT_ARROW.set(layoutData[scene].left);

  currentScene = scene;
}
/** INTERACTABLES BLOCK
 * removeInteractables: accepts hidden or visisble
 * take the currenthidden or visible array and interate over it, removing all the objects from the canvas.
 * note: if its a nested object (text box) it iterates over that nested object removing them individually.
 *
 * drawSceneInteractables: accepts the scene it pulls data from
 * switch statement that takes the type of obbject it is and creates a fabricJS object based on it's json data.
 * give it the onclick function and the hidden object ID it reveals.
 * pushes that to the nextInteractables array
 * draws all the items in the nextInteractables array
 * copies nextInteractables to currentInteractables.
 *
 * drawSceneHiddenInteractables: accepts the scene it pulls data from
 * switch statement that takes the type of object it is and creates a fabricJS object based on its json data.
 * sets those hidden objects to hidden and adds them to nextHiddenInteractables.
 * draws all the items in said array.
 * Copies nextHiddenInteractables to currentHiddenInteractables.
 */
function removeInteractables(type) {
  console.log("remove interactables");
  switch (type) {
    case "visible":
      if (currentInteractables.length != null) {
        console.log(`CURRENT INTERACTABLES: ${currentInteractables}`);
        currentInteractables.forEach((object) => {
          canvas.remove(object);
        });
      } else {
        return;
      }
      break;
    case "hidden":
      if (currentHiddenInteractables.length != null) {
        console.log(`CURRENT HIDDEN INTERACTABLES: ${currentInteractables}`);
        currentHiddenInteractables.forEach((object) => {
          console.log(`object for removal type: ${object.type}`)
          if(object.type === 'group'){
            object.forEachObject((item) => {
              canvas.remove(item);
              console.log('item removed');
            });
          }else{
          canvas.remove(object);
          }
        });
      } else {
        return;
      }
      break;
    default:
      return;
  }
}

function drawSceneInteractables(scene) {
  console.log("draw interactables");

  const interactablesCount = layoutData[scene].interactable_visible_count;
  if (interactablesCount > 0) {
    let nextInteractables = [];

    for (i = 0; i < interactablesCount; i++) {
      interactableData = layoutData[scene]['interactable_visible'][i];

      switch (interactableData.type) {
        case "talk":
          let interactable = fabric.util.object.clone(TALK);
          interactable
            .set({
              left: interactableData.left,
              top: interactableData.top,
              hiddenID: interactableData.hiddenID,
            })
            .on("mouseup", (interactable) => {
              revealHidden(interactable.target.hiddenID);
            });
          console.log(`hiddenID: ${interactable.hiddenID}`);
          nextInteractables.push(interactable);
          break;
        default:
          break;
      }
    }
    nextInteractables.forEach((object) => canvas.add(object));
    currentInteractables = nextInteractables;
  } else {
    return;
  }
}

function drawSceneHiddenInteractables(scene) {
  console.log(`Inside Draw Hidden Interactables, Scene: ${scene}`);

  const interactablesCount = layoutData[scene].interactable_hidden_count;
  if (interactablesCount > 0) {
    let nextInteractables = [];

    for (i = 0; i < interactablesCount; i++) {
      interactableData = layoutData[scene]['interactable_hidden'][i];
      switch (interactableData.type) {
        case "talk":
          let group = createTextBox(TALKBOX, dialogueData[interactableData.script], interactableData, 14, 5);
          group.set({
            visible: false,
          });
          group.on('mouseup', () => {
            returnVisible(group);
          });
          nextInteractables.push(group);
          break;
        default:
          break;
      }
    }
    nextInteractables.forEach((object) => canvas.add(object));
    currentHiddenInteractables = nextInteractables;
  } else {
    return;
  }
}

/**FUNCTIONALITY BLOCK
 *
 * revealHidden: accepts the hiddenID saved to the fabricJS object the user clicks
 * sets all other objects in the scene invisible via the current scene data arrays.
 * takes the hidden objectID and uses it as the array index to reveal the correct hiddenobject.
 * rerenders the scene.
 *
 * returnVisible: accepts the object you click on.
 * takes that object and returns it to invisible.
 * iterates through current scene data arrays and returns everything to visible.
 * rerenders the scene.
 *
 *
 */

function revealHidden(hiddenID) {
  console.log(`Inside Reveal Hidden, Hidden ID: ${hiddenID}`);
  currentInteractables.forEach((Interactable) => {
    Interactable.set({ visible: false });
  });
  console.log('interactables hidden');
  arrowArray.forEach((arrow) => {
    arrow.set({ visible: false });
  });
  console.log('arrows hidden');
  hiddenObj = currentHiddenInteractables[hiddenID];
  console.log(`hidden image obj: ${hiddenObj}`);
  hiddenObj.set({ visible: true, });
  console.log(`hidden image: ${hiddenObj.visible}`);

  canvas.requestRenderAll();

}

function returnVisible(hiddenObj) {
  hiddenObj.set({ visible: false });

  currentInteractables.forEach((Interactable) => {
    Interactable.set({ visible: true });
  });

  arrowArray.forEach((arrow) => {
    arrow.set({ visible: true });
  });
  canvas.requestRenderAll();
}

function createTextBox(cloneTarget, textData, objectData, fontSize, padding){
  let boxImage = fabric.util.object.clone(cloneTarget);
  boxImage.set({
    selectable: false,
    hoverCursor: "pointer",
    left: objectData.left,
    top: objectData.top,
  });

  let boxText = new fabric.Text(textData,{
    fontSize: fontSize ? fontSize : 12,
    top: boxImage.top + padding,
    left: boxImage.left + padding,
  });

  let textBoxGroup = new fabric.Group([boxImage, boxText], {
    left: objectData.left,
    top: objectData.top,
    selectable: false,
    hoverCursor: "pointer",
  });

  return textBoxGroup;
}


/** START THE GAME */
window.onload = () => {
  startLoading(loadComplete);
};
