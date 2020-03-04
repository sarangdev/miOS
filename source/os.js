const interact = require('interactjs');

const  _lang = { messages: { dataLoading: 'загружаю данные приложения' } };

class Window {
	template =`<div class="window" data-id="{id}">
		<div class="header">
			<div class="controls">
				<span class="btn btn-close">Close</span>
				<span class="btn btn-mini">Mini</span>
				<span class="btn btn-expand">Expand</span>
			</div>
			<span class="title">{title}</span>
		</div>
		<div class="content">
			<div class="loader"><div class="_spinner"></div><span>{messages.dataLoading}</span></div>
		</div>
	</div>`
	max = false
	container = $('.windows')
	constructor (data) {
		let id = Math.round(Math.random() * 999999); // rand
		
		// Подгружаем язык
		for (let i1 in _lang) {
			let item1 = _lang[i1];
			if (typeof item1 == 'object') {
				for (let i2 in item1) {
					let item2 = item1[i2];
					this.template = this.template.replace('{'+ i1 +'.'+ i2 +'}', item2);
					console.log('{'+ i1 +'.'+ i2 +'}');
				}
			}
		}
		
		this.container.append(this.template.replace('{id}', id));
		let self = this;

		$.get('app.json', (appInfo) => {
				$('.window[data-id="'+ id +'"] .header .title').text(appInfo.appName + ' ('+ appInfo.appVersion +')');
		});

  		$('.window[data-id="'+ id +'"]').resizable();

		var draggable = $('.window[data-id="'+ id +'"] .header'); //element 

		draggable.on('mousedown', function(e){
			var dr = $(this).parent().addClass("drag");
			let height = dr.outerHeight();
			let width = dr.outerWidth();
			let max_left = dr.parent().offset().left + dr.parent().width() - dr.width();
			let max_top = dr.parent().offset().top + dr.parent().height() - dr.height();
			let min_left = dr.parent().offset().left;
			let min_top = dr.parent().offset().top;

			let ypos = dr.offset().top + height - e.pageY;
			let xpos = dr.offset().left + width - e.pageX;

			if (document.querySelectorAll('.window').length > 1) {
				for (let i of $('.window'))  {
					let z = parseInt($(i).css('z-index'));
					$(i).css('z-index', z + 1);
				}
			}

			$(document.body).on('mousemove', function(e){
				var itop = e.pageY + ypos - height;
				var ileft = e.pageX + xpos - width;

				if(dr.hasClass("drag")){
					if(itop <= min_top ) { itop = min_top; }
					if(ileft <= min_left ) { ileft = min_left; }
					if(itop >= max_top ) { itop = max_top; }
					if(ileft >= max_left ) { ileft = max_left; }
					dr.offset({ top: itop,left: ileft});


				}
			}).on('mouseup', function(e){
					dr.removeClass("drag");
			});
		});



		$('.window[data-id="'+ id +'"]').find('.controls .btn.btn-close').click(() => { self.close(id); });

		$('.window[data-id="'+ id +'"]').find('.controls .btn.btn-expand').click(() => { self.maximize(id); });

		console.log('[Window] created: ' + data.title);
	}
	maximize(id) {
		$('.window[data-id="'+ id +'"]').toggleClass('max');


		//$('.windows').toggleClass('max');
		
		this.max = !this.max;
  	}
	close (id) {
		$('.window[data-id="'+ id +'"]').remove();
		if (this.max == true) { $('.windows').removeClass('max'); }
	}
}