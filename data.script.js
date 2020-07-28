const data = {
    destinationMap : {
        'scene1' : {
            up : 'scene2',
            down : 'scene3',
            right : 'scene5',
            left : 'scene4',
        },
        'scene2' : {
            up: null,
            down: 'scene1',
            right: null,
            left: null,
        },
        'scene3' : {
            up: 'scene1',
            down: null,
            right: null,
            left: null,
        }
    },
    layoutData : {
        scene1 : {
            background: 0,
            up : {
                left: 250,
                top: 50,
            },
            down : {
                left: 250,
                top: 200,
            },
            right : {
                left: 400,
                top: 150,
            },
            left : {
                left: 100,
                top: 150,
            },
        },
        scene2 : {
            background: 1,
            up : {
                visible: false,
            },
            down : {
                left: 250,
                top: 200,
            },
            right : {
                visible: false,
            },
            left : {
                visible: false,
            },
        },
        scene3 : {
            background : 2,
            up : {
                left: 250,
                top: 50,
            },
            down : {
                visible: false,
            },
            right : {
                visible: false,
            },
            left : {
                visible: false,
            },
        }
    }
};

export default data;