const cell_elemets = document.querySelectorAll('[cell]');
const cell_data_elemets = document.querySelectorAll('[cell_data]');
const end_div = document.getElementById('end_div')

let turn;
let is_end;

document.addEventListener("keydown", (event) => { if (event.key === "r" || event.key === "R") { restart(); }});

restart();

function restart()
{
	end_div.style.visibility = 'hidden';
	
	cell_data_elemets.forEach(cell_data_element => { cell_data_element.style.visibility = 'hidden'; });
	cell_data_elemets.forEach(cell_data_element => { cell_data_element.innerHTML = '✗'; cell_data_element.style.color = 'lightgrey'; });
	cell_elemets.forEach(cell_elemets => { cell_elemets.addEventListener('mouseover', mouseover)});
	cell_elemets.forEach(cell_elemets => { cell_elemets.addEventListener('mouseout', mouseout)});
	cell_elemets.forEach(cell_element => { cell_element.addEventListener('click', click, { once: true })});

	turn = 0;
	is_end = false;
}

function mouseover(event)
{
	event.currentTarget.firstElementChild.style.visibility = 'visible'
}

function mouseout(event)
{
	event.currentTarget.firstElementChild.style.visibility = 'hidden'
}

function click(event)
{
	if(is_end)
		return;

    let cell_data_element = event.currentTarget;

	cell_data_element.removeEventListener('mouseover', mouseover);
	cell_data_element.removeEventListener('mouseout', mouseout);
    cell_data_element.firstElementChild.style.visibility = 'visible';
    cell_data_element.firstElementChild.style.color = 'black';

	check_end()
	
	if(is_end)
		return;	

	bot_play();
	check_end()
}

function check_end()
{
	check_win(0, 1, 2);
	check_win(0, 3, 6);
	check_win(0, 4, 8);

	check_win(1, 4, 7);
	check_win(2, 5, 8);
	check_win(2, 4, 6);

	check_win(3, 4, 5);
	check_win(6, 7, 8);

	if(is_end)
		end_div.style.visibility = 'visible';
}

function check_win(a, b, c)
{
	let sign;
	if(window.getComputedStyle(cell_data_elemets[a]).visibility != "hidden")
	{
		sign = cell_data_elemets[a].innerHTML;
		if(window.getComputedStyle(cell_data_elemets[b]).visibility != "hidden" && window.getComputedStyle(cell_data_elemets[c]).visibility != "hidden")
			if(cell_data_elemets[b].innerHTML === sign && cell_data_elemets[c].innerHTML === sign)
			{
				cell_data_elemets[a].style.color = 'red';
				cell_data_elemets[b].style.color = 'red';
				cell_data_elemets[c].style.color = 'red';
				is_end = true;
			}
	}

	if(turn > 4)
		is_end = true;
}

function bot_play()
{
	while(turn < 4)
	{
        let cell_data_element = cell_data_elemets[Math.floor(Math.random() * cell_data_elemets.length)];
        if(window.getComputedStyle(cell_data_element).visibility === "hidden")
		{
            cell_data_element.innerHTML = 'O';
            cell_data_element.style.color = 'black';
            cell_data_element.style.visibility = 'visible';
			let cell_index = Array.prototype.indexOf.call(cell_data_elemets, cell_data_element);
			cell_elemets[cell_index].removeEventListener('mouseover', mouseover);
			cell_elemets[cell_index].removeEventListener('mouseout', mouseout);
			cell_elemets[cell_index].removeEventListener('click', click);
            break;
        }
    }

	turn++;
}
