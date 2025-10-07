/* Your Code Here */

function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return{
        firstName: firstName,
        familyName:familyName,
        title:title,
        payPerHour:payPerHour,
        timeInEvents:[],
        timeOutEvents:[]
    }
}

function createEmployeeRecords(arr){
    const mappedArr=arr.map(item=>{
        return createEmployeeRecord(item)
    })
    return mappedArr
}

const empo1 = createEmployeeRecord(['jeff', 'Muna', 'Manager', 50])
const empo2 = createEmployeeRecords([['jeff', 'Muna', 'Manager', 50], ['Jack', 'Mwangi', 'Security', 20]])
// console.log(empo2)

function createTimeInEvent(dateStamp){
    const [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type:'TimeIn',
        hour:parseInt(hour, 10),
        date:date
    })
    return this
}
const time=createEmployeeRecord.call(empo1, '2005-05-22 800')

const withContexTimeInEvents = createTimeInEvent.call(empo2[0], '2005-05-22 800')
// console.log(withContexTimeInEvents)


function createTimeOutEvent(dateStamp){
    const [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type:'TimeOut',
        hour:parseInt(hour, 10),
        date:date
    })
    return this
}

const withContexTimeOutEvents = createTimeOutEvent.call(empo2[0], '2005-05-22 1800')
// console.log(withContexTimeOutEvents)

function hoursWorkedOnDate(dateStamp){
    const timeIn = this.timeInEvents.find(item=>item.date===dateStamp)
    const timeOut = this.timeOutEvents.find(item=>item.date===dateStamp)
    return (timeOut.hour-timeIn.hour)/100
    
}

function wagesEarnedOnDate(dateStamp){
    return hoursWorkedOnDate.call(this, dateStamp)*this.payPerHour
}

const wagesOnDate = wagesEarnedOnDate.call(withContexTimeOutEvents, '2005-05-22')

// console.log(wagesOnDate)

// function allWagesFor(){
//     let wage = 0
//     for(const date of this.timeInEvents){
//         wage+=wagesEarnedOnDate(date.date)
//     }
//     return wage
// }

function findEmployeeByFirstName(collection, firstNameString){
    for(const obj of collection){
        if(obj.firstName===firstNameString){
            return obj
        }
    }
}

// console.log(findEmployeeByFirstName(empo2, 'Jack'))

function calculatePayroll(collection){
    let payroll=0
    for(const obj of collection){
        payroll+=allWagesFor.call(obj)
    }
    return payroll
}

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

