class App {
  constructor(id) {
    this.id = id;
    this.templates = [
      './templates/Header.html',
      './templates/Main.html',
      './templates/Footer.html'
    ]

    try {
      this.parts = {
        mainContainer: axios.get('./parts/main-container.html'),
        data: axios.get('./parts/data.json'),
      }
    } catch {
      throw ('Axios required.');
    }
  }

  run() {
    this.addChildElementToBody(this.createMainContainer());
    this.vue();
  }

  createMainContainer() {
    const el = document.createElement('div');
    el.setAttribute('id', this.id.replace('#', ''));
    return el
  }

  addChildElementToBody(el) {
    document.querySelectorAll('body').forEach((item, i) => {
      item.appendChild(el);
    });
  }

  addTemplateToBody(arr = []) {
    arr.forEach((item, i) => {
      document.querySelectorAll('body').forEach((body, i) => {
        body.innerHTML += item.data;
      });
    });
  }

  makeAxiosArray() {
    const arr = []
    this.templates.forEach((item, i) => {
      arr.push(axios.get(item));
    });
    return arr
  }

  vue() {
    try {
      axios.all(Object.values(this.parts)).then(responses => {
        axios.all(this.makeAxiosArray()).then(templates => {

          this.addTemplateToBody(templates);

          /* Vuex */
          Vue.use(Vuex);
          const store = new Vuex.Store({
            state: {
              langpack: responses[1],
            },
          })

          /* Start */
          new Vue({
            el: this.id,
            store,
            components: {
              'header-component': () => import('../components/Header.js'),
              'main-component': () => import('../components/Main.js'),
              'footer-component': () => import('../components/Footer.js'),
            },
            template: responses[0].data,
          })
        })
      })

    } catch {
      throw ('Vue.js, Vuex required.');
    }
  }
}

new App('#app').run();
