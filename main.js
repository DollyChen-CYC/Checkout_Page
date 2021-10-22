// ------ Variables -------- //
let indexActiveForm = 0

// --------- Nodes ---------- //
const stepper = document.querySelector('.steps-wrapper')
const stepList = stepper.querySelectorAll('.step')
const progressLine = stepper.querySelector('.progress-line')
const formGroup = document.querySelector('.form-group')
const formList = formGroup.querySelectorAll('.form-part')
const btnGroup = document.querySelector('.btn-groups')
const btnPrevious = btnGroup.querySelector('.btn-previous')
const btnNext = btnGroup.querySelector('.btn-next')
const btnSubmit = btnGroup.querySelector('.btn-submit')
const shoppingList = document.querySelector('.shopping-list')

// ------- Functions -------- //
function handleBtnsClick(event) {
  event.preventDefault()
  const targetItem = event.target
  
  // back to previous stage
  if (targetItem.classList.contains('btn-previous') && indexActiveForm > 0) {
    const nextForm = formList[indexActiveForm - 1]
    updateFormPart(nextForm)
    indexActiveForm--
    changeBtnStyle(indexActiveForm)
    changeStepperStyle(indexActiveForm)
    updateProgressLine(indexActiveForm, formList.length)

  // go to next step
  } else if (targetItem.classList.contains('btn-next') && indexActiveForm < formList.length - 1) {
    const nextForm = formList[indexActiveForm + 1]
    updateFormPart(nextForm)
    indexActiveForm++
    changeBtnStyle(indexActiveForm)
    changeStepperStyle(indexActiveForm)
    updateProgressLine(indexActiveForm, formList.length)

  // submit form
  } else if (targetItem.classList.contains('btn-submit') && indexActiveForm === formList.length - 1) {
    alert('訂單已送出')
    window.location.reload()
  }
}

function updateFormPart(nextForm) {
  const currentForm = formList[indexActiveForm]
  currentForm.classList.add('d-none')
  nextForm.classList.remove('d-none')
}

function changeBtnStyle(currentIndex) {
  // change btn style according to current stage
  switch (currentIndex) {
    case 0 :
      btnPrevious.classList.add('d-none')
      break
    case formList.length - 1:
      btnNext.classList.add('d-none')
      btnSubmit.classList.remove('d-none')
      break
    default:
      btnPrevious.classList.remove('d-none')
      btnNext.classList.remove('d-none')
      btnSubmit.classList.add('d-none')
  }
}

function changeStepperStyle(currentIndex) {
  // change stepper style according to current step
  stepList.forEach((step, stepIndex) => {
    step.classList.remove('active')
    if(stepIndex < currentIndex) {
      step.classList.add('checked')
    }
  })
  stepList[currentIndex].classList.remove('checked')
  stepList[currentIndex].classList.add('active')
}

function updateProgressLine(currentIndex, totalStage) {
  const lineWidth = currentIndex / (totalStage - 1) * 100
  progressLine.style.width = `${lineWidth}%`
}
// ------- Functions execution or invoked ------- //

// Event listener for form page controls
btnGroup.addEventListener('click', handleBtnsClick)

// shoppingList.addEventListener('click', handleQtyController)


