function loan_submit() {
    //get data
    var g_loan = document.forms["loan_system"]["loan"].value;
    var g_rate = document.forms["loan_system"]["interest_rate_per_year"].value;
    var g_time = document.forms["loan_system"]["installment_period_in_year"].value;
    var g_dt = document.forms["loan_system"]["depreciation_type"].value;
    var g_ds = document.forms["loan_system"]["depreciation_start"].value;
    //check input
    if (g_loan == "" && g_rate == "" && g_time == "" && g_dt == "" && g_ds == "") {
        document.getElementById("x_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        document.getElementById("r_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        document.getElementById("t_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        document.getElementById("dt_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        document.getElementById("ds_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        return false;
    } else if (g_loan == "") {
        document.getElementById("x_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        document.getElementById("r_novamsg").textContent = "";
        document.getElementById("t_novamsg").textContent = "";
        document.getElementById("dt_novamsg").textContent = "";
        document.getElementById("ds_novamsg").textContent = "";
        return false;
    } else if (g_rate == "") {
        document.getElementById("x_novamsg").textContent = "";
        document.getElementById("r_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        document.getElementById("t_novamsg").textContent = "";
        document.getElementById("dt_novamsg").textContent = "";
        document.getElementById("ds_novamsg").textContent = "";
        return false;
    } else if (g_time == "") {
        document.getElementById("x_novamsg").textContent = "";
        document.getElementById("r_novamsg").textContent = "";
        document.getElementById("t_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        document.getElementById("dt_novamsg").textContent = "";
        document.getElementById("ds_novamsg").textContent = "";
        return false;
    } else if (g_dt == "") {
        document.getElementById("x_novamsg").textContent = "";
        document.getElementById("r_novamsg").textContent = "";
        document.getElementById("t_novamsg").textContent = "";
        document.getElementById("dt_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        document.getElementById("ds_novamsg").textContent = "";
        return false;
    } else if (g_ds == "") {
        document.getElementById("x_novamsg").textContent = "";
        document.getElementById("r_novamsg").textContent = "";
        document.getElementById("t_novamsg").textContent = "";
        document.getElementById("dt_novamsg").textContent = "";
        document.getElementById("ds_novamsg").textContent = "សូមបញ្ចូលទិន្នន័យ!";
        return false;
    } else {
        document.getElementById("x_novamsg").textContent = "";
        document.getElementById("r_novamsg").textContent = "";
        document.getElementById("t_novamsg").textContent = "";
        document.getElementById("dt_novamsg").textContent = "";
        document.getElementById("ds_novamsg").textContent = "";
        //convert to number
        var g_x = parseFloat(g_loan);
        var g_r = parseFloat(g_rate);
        var g_t = parseInt(g_time);
        var c_x = new Number(g_x).toLocaleString("fi-FI");
        var s_x = document.getElementById("s_loan").textContent = c_x + " ដុល្លារ" ;
        var s_r = document.getElementById("s_interest_rate_per_year").textContent = g_r + " ភាគរយ";
        var s_t = document.getElementById("s_installment_period_in_year").textContent = g_t + " ឆ្នាំ";
        if (g_dt == "monthly") {
            var s_dt = document.getElementById("s_depreciation_type").textContent = "ខែ";
        } else if (g_dt == "annual") {
            var s_dt = document.getElementById("s_depreciation_type").textContent = "ឆ្នាំ";
        }
        var s_ds = document.getElementById("s_depreciation_start").textContent = g_ds;
        var my_data = '';
        //calulation
        if (g_dt == "monthly") { //month
            var interest = (g_x * g_r)/100 * g_t;
            var total_loan = g_x + interest;
            var t_in_month = g_t * 12;
            var payment_a_month = total_loan / (g_t * 12);
            var interest_a_month = interest / (g_t * 12);
            var remain_loan = total_loan - payment_a_month;
            //limit float
            var interest = interest.toFixed(2);
            var total_loan = total_loan.toFixed(2);
            var payment_a_month = payment_a_month.toFixed(2);
            var interest_a_month = interest_a_month.toFixed(2);
            var remain_loan = remain_loan.toFixed(2);
            
            var mm = t_in_month;
            //Show Data to pay
            for (var i = 1; i <= t_in_month; i++) {
                for (var mm = i; mm <= i; mm++) {
                    my_data += "<tr><td>" + i + "</td><td>" + mm + "</td><td>" + "$" + payment_a_month + "</td><td>" + "$" + interest_a_month + "</td><td>" + "$" + remain_loan + "</td></tr>";
                    remain_loan -= payment_a_month;
                    remain_loan = remain_loan.toFixed(2);
                }
            }
            //Show Result
            document.getElementById('data_tb').innerHTML = `<tr><td>ល.រ</td><td>ខែទី</td><td>ប្រាក់ត្រូវបង់ (ក្នុងមួយខែ)</td><td>ការប្រាក់ (ក្នុងមួយខែ)</td><td>ប្រាក់ដើមនៅសល់</td></tr>${my_data}<tr><td></td><td></td><td>សរុបប្រាក់បង់៖​ $${total_loan}</td><td>សរុបការប្រាក់៖​ $${interest}</td><td></td></tr>`;
        } else if (g_dt == "annual") { //year
            var interest = (g_x * g_r)/100 * g_t;
            var total_loan = g_x + interest;
            var payment_a_year = total_loan / g_t;
            var interest_a_year = interest / g_t;
            var remain_loan = total_loan - payment_a_year;
            //limit float
            var interest = interest.toFixed(2);
            var total_loan = total_loan.toFixed(2);
            var payment_a_year = payment_a_year.toFixed(2);
            var interest_a_year = interest_a_year.toFixed(2);
            var remain_loan = remain_loan.toFixed(2);
            
            var mm = g_t;
            //Show Data to pay
            for (var i = 1; i <= g_t; i++) {
                for (var mm = i; mm <= i; mm++) {
                    my_data+= "<tr><td>" + i + "</td><td>" + mm + "</td><td>" + "$" + payment_a_year + "</td><td>" + "$" + interest_a_year + "</td><td>" + "$" + remain_loan + "</td></tr>";
                    remain_loan -= payment_a_year;
                    remain_loan = remain_loan.toFixed(2);
                }
            }
            //Show Result
            document.getElementById('data_tb').innerHTML = `<tr><td>ល.រ</td><td>ឆ្នាំទី</td><td>ប្រាក់ត្រូវបង់(ក្នុងមួយឆ្នាំ)</td><td>ការប្រាក់(ក្នុងមួយឆ្នាំ)</td><td>ប្រាក់ដើមនៅសល់</td></tr>${my_data}<tr><td></td><td></td><td>សរុបប្រាក់បង់៖​ $${total_loan}</td><td>សរុបការប្រាក់៖​ $${interest}</td><td></td></tr>`;

        }


    }
}