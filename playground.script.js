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
      //REMEMBER TO FIGURE OUT HOW TO REMOVE TEXT AND IMAGE
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
              //TODO figure out how to link the hidden object to the current clicked object for revealing
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
function drawSceneHiddenInteractables(scene) {
  console.log(`Inside Draw Hidden Interactables, Scene: ${scene}`);

  const interactablesCount = layoutData[scene].interactable_hidden_count;
  if (interactablesCount > 0) {
    let nextInteractables = [];

    for (i = 0; i < interactablesCount; i++) {
      interactableData = layoutData[scene]['interactable_hidden'][i];
      switch (interactableData.type) {
        case "talk":
          console.log('inside talk case');
          let interactable = fabric.util.object.clone(TALKBOX);
          interactable.set({
            left: interactableData.left,
            top: interactableData.top,
          });

          let textObj = new fabric.Text(dialogueData[interactableData.script]);
          console.log(`Dialogue Data: ${textObj}`);
          textObj.set({
            fontSize: 14,
            top: interactable.top + 5,
            left: interactable.left + 5,
          });

          let group = new fabric.Group([interactable, textObj], {
            left: interactableData.left,
            top: interactableData.top,
            visible: false,
            selectable: false,
            hoverCursor: "pointer",
          }).on('mouseup', () => {
            returnVisible(group);
          });
          console.log(`GROUP: ${group}`);
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

window.onload = () => {
  startLoading(loadComplete);
};
