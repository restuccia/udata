import config from 'config';
import commonmark from 'helpers/commonmark';
import txt from 'helpers/text';


export function install(Vue) {
    Vue.directive('markdown', {
        bind(el) {
            el.classList.add('markdown');
        },
        update: function(el, binding) {
            el.classList.add('markdown');
            el.innerHTML = binding.value ? commonmark(binding.value, config.markdown) : '';
        },
        unbind(el) {
            el.classList.remove('markdown');
        },
    });

    Vue.filter('markdown', function(text, max_length) {
        if (!text) {
            return '';
        }
        if (max_length) {
            const div = document.createElement('div');
            div.classList.add('markdown');
            div.innerHTML = commonmark(text, config.markdown);
            return txt.truncate(div.textContent || div.innerText || '', max_length);
        } else {
            return commonmark(text, config.markdown);
        }
    });
}
