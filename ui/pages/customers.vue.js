const date = new Date();
const curYear = date.toISOString().substring(0,4);
const curMont = date.toISOString().substring(5,7);
const Y = '<button type="button" class="btn btn-primary mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="addPayment(cust)">Make Payment</button>';
const N = '<button type="button" class="btn btn-secondary" >Fully Paid</button>';

const customers={template:`
<div>

    <div class="col-md-8">
        <div class="input-group mb-3">
            <span class="input-group-text">Enter your phone number</span>
            <input type="text" class="form-control" v-model="phoneNumber" value="9999999999">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Enter your setup box number Name</span>
            <input type="text" class="form-control" v-model="setupBoxNumber" value="MS001">
        </div>
        <button type="button" @click="viewAccount()"
            class="btn btn-primary">
            View Account
        </button>
    </div>

    <table class="table table-striped">
    <thead>
            
        <tr>
            <th>CustomerId</th>
            <th>CustomerName</th>
            <th>Plan</th>
            <th>DateOfJoining</th>
            <th>PhoneNumber</th>
            <th>SetupBoxNumber</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="cust in customers">
            <td>{{cust.CustomerId}}</td>
            <td>{{cust.CustomerName}}</td>
            <td>{{cust.Plan}}</td>
            <td>{{cust.DateOfJoining}}</td>
            <td>{{cust.PhoneNumber}}</td>
            <td>{{cust.SetupBoxNumber}}</td>
        
            <td v-if="cust.Pending">${Y}</td>
            <td v-else>${N}</td>
        </tr>
    </tbody>
    </thead>
    </table>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Payment Amount</span>
                        <input type="text" class="form-control" v-model="PaymentAmount">
                    </div>
                    <button type="button" @click="createPayment()"
                    class="btn btn-primary">
                    Pay
                    </button>
                </div>
            </div>

        </div>
    </div>

</div>

`,

data(){
    return{
        modalTitle:"",
        customers: [],
        CustomerId:0,
        PaymentAmount: 0,
        setupBoxNumber: "",
        phoneNumber: ""
    }
},
methods:{
    addPayment(cust){
        this.modalTitle="Make Payment";
        this.CustomerId=cust.CustomerId;
        this.PaymentAmount=cust.Plan;
    },
    createPayment(){
        this.modalTitle="Make Payment";
        axios.post("http://127.0.0.1:8000/account",{
            CustomerId:this.CustomerId,
            PaidAmount:this.PaymentAmount,
            DateOfPayment: date.toISOString().split('T')[0]
        })
        .then((response)=>{
            this.viewAccount();
            alert("Payment Successfull")
        });
    },
    viewAccount(){
        axios.get("http://127.0.0.1:8000/account",{ params : {
            phoneNumber:this.phoneNumber,
            setupBoxNumber:this.setupBoxNumber
        }})
        .then((response)=>{
            this.customers = [];
            if(response.data.LastPaymentDate != null && +new Date(curYear,curMont) > +new Date(response.data.LastPaymentDate.substring(0,4), response.data.LastPaymentDate.substring(5,7))){
                response.data.Pending = true;
                response.data.PendingPayment = Number(response.data.Plan) * 3
            } else {
                response.data.Pending = false;
            }
            this.customers.push(response.data);

        });
    },
},
mounted:function(){
}

}