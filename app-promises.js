const users = [{
    id : 1,
    name : 'Andrew',
    schoolId : 101
}, {
        id: 2,
        name: 'Jessica',
        schoolId: 999
    }];
const grades = [{
    id : 1,
    schoolId : 101,
    grade : 86
}, {
        id: 2,
        schoolId: 999,
        grade: 100
    }, {
        id: 3,
        schoolId: 101,
        grade: 90
    }];

const getUser = (id) =>{
    // async code (Means getting the user with NOT NOW code "Going to take a while to fetch user")
    // Promise is ALWAYS ASYNC
    // do the work
    return new Promise((resolve , reject)=>{
        const user = users.find((user)=>{
            return user.id === id;
        });
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    })
}

const getGrades = (schoolId) =>{
    // do the work
    // fetch grade
    return new Promise((resolve , reject)=>{
        // resolve(grades.filter((grade)=>{
        //     return grade.schoolId === schoolId;
        // }));

        const result = grades.find((grade) => {
            return grade.schoolId === schoolId;
        });

        if(result)
        {
            resolve(result)
        }
        else{
            reject("Unable to find grades")
        }
    })
}

// Andrew has 83% in the class
const getStatus = (userId) => {
    var user;
    // we have promise chain
    // do the work
    return getUser(userId).then((tempUser)=>{
        console.log(tempUser);
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades)=>{
        console.log(grades);
        let average = 0;
        if(grades.length > 0){
            average = grades.map((grade) => grade.grade).reduce((a , b) => a + b) / grades.length;
        }

        return `${user.name} has a ${average} in the class.`;
        // average 
        // return our string
    });
}

getStatus(1).then((status)=>{
    console.log(status);
}).catch((e)=> console.log(e));


// let generator = function*(){
//     yield 0 + 1;
//     yield 0 + 2;
//     yield 0 + 3;
//     yield "Hell0";
//     return "Done";
// }

// let gen = generator();

// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());