$(document).ready(() => {
	var window1 = new Window({ id: 1 });
});

$(document).contextmenu((e) => {
	e.preventDefault();
	console.log('context', e);
	let item = $('body').append(`<div class="contextmenu" style="top: ${e.pageY}px; left: ${e.pageX}px;">
		<div>Сменить обои</div>
		<div onclick="reboot()">Перезагрузка</div>
	</div>`);
	$('.contextmenu').mouseleave(() => {
		$('.contextmenu').remove();
	});
});

function reboot () {
	window.location.reload();
}