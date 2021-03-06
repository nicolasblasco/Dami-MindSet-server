window.onload = function() {

  requestApplications();

  //----- Variables -----//

  const modal = document.getElementById("background-modal");
  const form = document.getElementById("form");
  const modalTitle = document.getElementById("modal-title");
  const description = document.getElementById("modal-description");
  const createButton = document.getElementById("create-button");
  const confirmCreateButton = document.getElementById("confirm-create-button");
  const confirmUpdateButton = document.getElementById("confirm-update-button");
  const confirmRemoveButton = document.getElementById("confirm-remove-button");
  const cancelButton = document.getElementById("cancel-button");
  const result = document.getElementById("result");
  const errorResultMessage = document.getElementById("error-result");

//----- Event Listeners -----//

createButton.addEventListener("click", openCreateModal);
cancelButton.addEventListener("click", closeModal);
confirmCreateButton.addEventListener("click", requestCreateApplication);
result.addEventListener('blur', validateResult);
result.addEventListener('focus', clearResultError);

//----- Modals -----//

function closeModal() {
  modal.classList.add("hidden");
  form.classList.add("hidden");
  confirmCreateButton.classList.add("hidden");
  confirmUpdateButton.classList.add("hidden");
  confirmRemoveButton.classList.add("hidden");
  errorResultMessage.classList.add("hidden");
  description.innerHTML = "";
  clearSelects();
  requestApplications();
}

function openCreateModal() {
  modal.classList.remove("hidden");
  form.classList.remove("hidden");
  confirmCreateButton.classList.remove("hidden");
  modalTitle.innerHTML = "Create Application";
  description.innerHTML = "Please fill out the form to create a new application"
  selectPosition();
  selectCandidate();
  selectInterview();
  createSelectStatus();
}

function openUpdateModal(application) {
  modal.classList.remove("hidden");
  form.classList.remove("hidden");
  confirmUpdateButton.classList.remove("hidden");
  modalTitle.innerHTML = "Update Application";
  description.innerHTML = "Please complete the form to update this application"
  selectPosition(application.idPosition);
  selectCandidate(application.idCandidate);
  selectInterview(application.idInterview);
  saveDateTime(application.dateTime);
  createSelectStatus(application.status);
  saveResult(application.result);
  confirmUpdateButton.onclick = function() {
    requestUpdateApplication(application);
  }
}

function openRemoveModal(application) {
  modal.classList.remove("hidden");
  form.classList.add("hidden");
  confirmRemoveButton.classList.remove("hidden");
  modalTitle.innerHTML = "Remove Application";
  description.innerHTML = "Are you sure you want to remove this application?"
  confirmRemoveButton.onclick = function() {
    requestRemoveApplication(application);
  }
}

function successModal(application) {
  modal.classList.remove("hidden");
  form.classList.add("hidden");
  confirmCreateButton.classList.add("hidden");
  confirmUpdateButton.classList.add("hidden");
  confirmRemoveButton.classList.add("hidden");
  modalTitle.innerHTML = "Successful Request!";
  description.innerHTML =
  `<ul>
    <li>Candidate: ${application.idCandidate}</li>
    <li>Position: ${application.idPosition}</li>
    <li>Interview: ${application.idInterview}</li>
    <li>Data and time: ${application.dateTime}</li>
    <li>Status: ${application.status}</li>
    <li>Result: ${application.result}</li>
  </ul>`;
}

function errorModal(error) {
  modal.classList.remove("hidden");
  form.classList.add("hidden");
  confirmCreateButton.classList.add("hidden");
  confirmUpdateButton.classList.add("hidden");
  confirmRemoveButton.classList.add("hidden");
  modalTitle.innerHTML = "Failed Request!";
  description.innerHTML = `${error}`;
}

//----- Retrieve data from Candidates, Clients & Positions -----//

function selectCandidate(id) {
  const url = "http://localhost:4000/api/candidates";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createSelectCandidate(data, id);
    })
    .catch((error) => {
      return error;
    });
}

function selectPosition(id) {
  const url = "http://localhost:4000/api/positions";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createSelectPosition(data, id);
    })
    .catch((error) => {
      return error;
    });
}

function selectInterview(id) {
  const url = "http://localhost:4000/api/interviews";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createSelectInterview(data, id);
    })
    .catch((error) => {
      return error;
    });
}

//----- Create selects in form -----//

function createSelectCandidate(collection, id) {
  const select = document.getElementById("idCandidate");
  select.innerHTML = `<option value="" selected disabled hidden>Select a Candidate</option>`
  collection.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc._id;
    option.innerHTML = doc.name;
    if (id === doc._id) option.setAttribute("selected","selected");
    select.appendChild(option);
  })
}

function createSelectPosition(collection, id) {
  const select = document.getElementById("idPosition");
  select.innerHTML = `<option value="" selected disabled hidden>Select a Postion</option>`
  collection.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc._id;
    option.innerHTML = doc.name;
    if (id === doc._id) option.setAttribute("selected","selected");
    select.appendChild(option);
  })
}

function createSelectInterview(collection, id) {
  const select = document.getElementById("idInterview");
  select.innerHTML = `<option value="" selected disabled hidden>Select an Interview</option>`
  collection.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc._id;
    option.innerHTML = doc._id;
    if (id === doc._id) option.setAttribute("selected","selected");
    select.appendChild(option);
  })
}

function createSelectStatus(status) {
  const select = document.getElementById("status");
  select.innerHTML = `<option value="" selected disabled hidden>Select a Status</option>`
  const pending = document.createElement("option");
  pending.innerHTML = "PENDING";
  const scheduled = document.createElement("option");
  scheduled.innerHTML = "SCHEDULED";
  const hired = document.createElement("option");
  hired.innerHTML = "HIRED";
  const rejected = document.createElement("option");
  rejected.innerHTML = "REJECTED";
  if (status === "PENDING") pending.setAttribute("selected","selected");
  if (status === "SCHEDULED") scheduled.setAttribute("selected","selected");
  if (status === "HIRED") hired.setAttribute("selected","selected");
  if (status === "REJECTED") rejected.setAttribute("selected","selected");
  select.appendChild(pending);
  select.appendChild(scheduled);
  select.appendChild(hired);
  select.appendChild(rejected);
}

function saveDateTime(date) {
  const input = document.getElementById("dateTime");
  const dateTime = date.substring(0,date.length-8);
  input.value = dateTime;
}

function saveResult(result) {
  const input = document.getElementById("result");
  input.value = result;
}

//----- Clear selects in form -----//

function clearSelects() {
  const selectFormCandidate = document.getElementById("idCandidate");
  const selectFormPosition = document.getElementById("idPosition");
  const selectFormInterview = document.getElementById("idInterview");
  const selectFormStatus = document.getElementById("status");
  selectFormCandidate.innerHTML = "";
  selectFormPosition.innerHTML = "";
  selectFormInterview.innerHTML = "";
  selectFormStatus.innerHTML = "";
}

function selectInterview(id) {
  const url = "http://localhost:4000/api/interviews";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createSelectInterview(data, id);
    })
    .catch((error) => {
      return error;
    });
}

//----- Retrieve names from Candidates & Positions -----//

async function getName(id, resource) {
  try {
    const res = await fetch(`http://localhost:4000/api/${resource}/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      return data.name;
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.log(err);
  }
}

//----- Create rows with data retrieved from Applications into table -----//

async function createList(applications) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  applications.forEach(async (application) => {
    let position = await getName(application.idPosition,"positions");
    let candidate = await getName(application.idCandidate,"candidates");
    //let interview = await getName(application.idInterview,"interviews");
    let itemList = document.createElement("tr");
    itemList.innerHTML = `<td class="application" >${application._id}</td>
      <td>${position}</td>
      <td>${candidate}</td>
      <td>${application.idInterview}</td>
      <td>${application.dateTime}</td>
      <td>${application.status}</td>
      <td>${application.result}</td>
      <td><button class="update" class="button-list"><img src="img/Icon-edit.png" alt="Edit"/></button>
      <td><button class="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button>
      </td>`
    tableBody.appendChild(itemList);
    itemList.querySelector(".application").addEventListener("click", function() {
      infoModal(application);
    });
    itemList.querySelector(".update").addEventListener("click", function() {
      openUpdateModal(application);
    });
    itemList.querySelector(".remove").addEventListener("click", function() {
      openRemoveModal(application);
    });
  })
}

//----- Create -----//

function requestCreateApplication() {
  let createApplication = {
    idCandidate: document.getElementById("idCandidate").value,
    idPosition: document.getElementById("idPosition").value,
    idInterview: document.getElementById("idInterview").value,
    dateTime: document.getElementById("dateTime").value,
    status: document.getElementById("status").value,
    result: document.getElementById("result").value
  }
  const url = "http://localhost:4000/api/applications";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(createApplication),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 201) return res.json();
      throw new Error(JSON.stringify(res.json()));
    })
    .then((data) => {
      successModal(data);
      requestApplications();
    })
    .catch((error) => {
      errorModal(error);
    });
  }

//----- Read all -----//

function requestApplications() {
  const url = "http://localhost:4000/api/applications/";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createList(data);
    })
    .catch((error) => {
      return error;
    });
  }

  //----- Update -----//

  function requestUpdateApplication(application) {
    let updateApplication = {
      idCandidate: document.getElementById("idCandidate").value,
      idPosition: document.getElementById("idPosition").value,
      idInterview: document.getElementById("idInterview").value,
      dateTime: document.getElementById("dateTime").value,
      status: document.getElementById("status").value,
      result: document.getElementById("result").value
    }
    const url = `http://localhost:4000/api/applications/${application._id}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(updateApplication),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(JSON.stringify(res.json()));
      })
      .then((data) => {
        successModal(data);
      })
      .catch((error) => {
        errorModal(error);
      });
    }

  //----- DELETE -----//

  function requestRemoveApplication(application) {
    const url = `http://localhost:4000/api/applications/${application._id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(JSON.stringify(res.json()));
      })
      .then((data) => {
        successModal(data);
        requestApplications();
      })
      .catch((error) => {
        errorModal(error);
      });
  }

  //----- Validations -----//

  function clearResultError(e) {
    errorResultMessage.classList.add("hidden");
  }
  function validateResult(e) {
    const error = result.value;
    if (!error) {
      errorResultMessage.classList.remove("hidden");
      errorResultMessage.innerText = "Description is missing.";
    }
    if (error.length > 5000 || error.length < 5) {
      errorResultMessage.classList.remove("hidden");
      errorResultMessage.innerText = "Description must be greater than 5 and less than 5000 characters.";
    }
  }
}