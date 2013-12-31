(function(root){
    var data = [
            {
                course_code : 'CMSC 100',
                section_name : 'X-3L',
                time : '4-7',
                day : 'W',
                department : 'ICS',
                college : 'CAS',
                students : [
                    {
                        name : 'Raven Lagrimas',
                        student_number : '2010-43168'
                    },
                    {
                        name : 'Cedric Abuso',
                        student_number : '2010-71239'
                    },
                    {
                        name : 'Sherwin Ferrer',
                        student_number : '2010-12385'
                    },
                    {
                        name : 'Aldrin Bautista',
                        student_number : '2009-87321'
                    },
                    {
                        name : 'Nino Eclarin',
                        student_number : '2009-28517'
                    }
                ]
            },
            {
                course_code : 'CMSC 100',
                section_name : 'X-4L',
                time : '4-7',
                day : 'Th',
                department : 'ICS',
                college : 'CAS',
                students : [
                    {
                        name : 'Jean Manas',
                        student_number : '2010-51883'
                    },
                    {
                        name : 'Tine Magdangan',
                        student_number : '2009-76122'
                    },
                    {
                        name : 'Kim Ortinez',
                        student_number : '2011-56211'
                    },
                    {
                        name : 'Christine Alcachupas',
                        student_number : '2009-09821'
                    },
                    {
                        name : 'Nicole Tibay',
                        student_number : '2009-63443'
                    }
                ]
            }
        ],
        i,
        initList = function (d) {
            var i,
                e = document.getElementById('classes_list');
            e.innerHTML = '';
            for (i = 0; i < d.length; i += 1) {
                e.innerHTML += '<li class="class_item" id="' + i + '">' + d[i].course_code + ' ' + d[i].section_name + '</li>';
            }
            e = document.getElementsByClassName('class_item')
            for (i = 0; i < e.length; i += 1) {
                e[i].onclick = function (e) {
                    initSheet(e.target.id, e.target);
                };
            }
        },
        initSheet = function (i, e) {
            var table = document.getElementById('students_table'),
                button = document.getElementById('finalize_button'),
                body = '',
                temp,
                j;
            (temp = document.getElementsByClassName('active')[0]) && (temp.className = '');
            (!e) && (e = document.getElementById(i));
            e.className = 'active';
            document.getElementById('class_span').innerHTML = data[i].course_code + ' ' + data[i].section_name;
            document.getElementById('time_span').innerHTML = data[i].day + ' ' + data[i].time;
            document.getElementById('col_span').innerHTML = data[i].college;
            document.getElementById('dept_span').innerHTML = data[i].department;
            for (j = 0; j < data[i].students.length; j += 1) {
                body +=
                '<tr>   \
                    <td>' + data[i].students[j].student_number + '</td> \
                    <td>' + data[i].students[j].name + '</td> \
                    <td> \
                        <select> \
                            <option disabled="disabled" selected="selected">---</option> \
                            <option>1.00</option> \
                            <option>1.25</option> \
                            <option>1.50</option> \
                            <option>1.75</option> \
                            <option>2.00</option> \
                            <option>2.25</option> \
                            <option>2.50</option> \
                            <option>2.75</option> \
                            <option>3.00</option> \
                            <option>4.00</option> \
                            <option>5.00</option> \
                            <option>INC</option> \
                            <option>DRP</option> \
                            <option>U</option> \
                            <option>S</option> \
                        </select> \
                    </td> \
                </tr>';
            }
            table.innerHTML = body;
            if (data[i].finalized) {
                button.disabled = 'disabled';
                button.innerHTML = 'Grade Sheet already finalized';
            }
            else {
                button.disabled = '';
                button.innerHTML = 'FINALIZE';
            }
        };


    root.onresize = function () {
        var temp1 = document.getElementsByTagName('section');
        for (i in temp1) {
            if (i > -1 && temp1.hasOwnProperty(i)) {
                temp1[i].style.height = root.innerHeight + 'px';
                temp1[i].style.width = root.innerWidth + 'px';
            }
        }
        document.getElementById('sheet_container_div').style.width = root.innerWidth - '285' + 'px';
    };
    root.onresize();

    document.getElementById('finalize_button').onclick = function (e) {
        if(
            confirm('Are you sure you want to finalize?') &&
            confirm('Did you already double check the records?') &&
            confirm('Ok. This is the last time. Are you sure? Nobody wants a change of grade after this.')
        ){
            e.target.disabled = 'disabled';
            e.target.innerHTML = 'Grade Sheet already finalized';
            data[document.getElementsByClassName('active')[0].id].finalized = true;
        }
    };
    
    document.getElementById('sign_in_button').onclick = function () {
        var self = this,
            username = document.getElementById('username_input'),
            password = document.getElementById('password_input');
        password.disabled = username.disabled = 'disabled';
        if (username.value === 'ravenjohn' && password.value === 'ravengwapo') {
            self.innerHTML = 'Login Success!';
            self.className = 'sign_in_success';
            document.getElementById('instructor_span').innerHTML = 'Mr. Rommel V. Bulalacao';
            initList(data);
            initSheet(0);
            setTimeout(function () {
                document.getElementById('front_section').className = 'current-to-left';
                document.getElementById('main_section').className = 'right-to-current';
                self.className = '';
                self.innerHTML = 'Sign In';
                password.value = username.value = password.disabled = username.disabled = '';
            }, 250);
        } else {
            self.innerHTML = 'Error!';
            self.className = 'sign_in_error';
            setTimeout(function () {
                self.className = '';
                self.innerHTML = 'Sign In';
                password.disabled = username.disabled = '';
                username.focus();
            }, 1000);
        }
    };
    
    document.getElementById('logout_button').onclick = function () {
        document.getElementById('front_section').className = 'left-to-current';
        document.getElementById('main_section').className = 'current-to-right';
        document.getElementById('username_input').focus();
    };

    document.getElementById('username_input').focus();
}(this));
