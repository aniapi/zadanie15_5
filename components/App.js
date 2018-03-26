var GIPHY_API_URL = 'http://api.giphy.com';
var GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';


App = React.createClass({

    getInitialState() {
    	return {
        loading: false,
        searchingText: '',
        gif: {}
    	};
    },

	handleSearch: function(searchingText) {  // 1. pobiera tekst
	    this.setState({
	      loading: true  // 2. zaczyna ładowanie
	    });
	    this.getGif(searchingText).then(gif => {
	      this.setState({  // 4 
	        loading: false,  // a koniec ładowania
	        gif: gif,  // b nowy gif
	        searchingText: searchingText  // c nowy stan dla wyszukiwanego tekstu
	      });
	    });  // 3. rozpoczyna pobieranie gifa
	},

	getGif: function(searchingText) {  // 1. test + funkca po pobraniu gifa
		return new Promise((resolve, reject) => {
			var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2. konstruujemy URL
		    var xhr = new XMLHttpRequest();  // 3. zapytanie do serwera
		    xhr.open('GET', url);
		    xhr.onload = function() {
		        if (xhr.status === 200) {
		           var data = JSON.parse(xhr.responseText).data; // 4. rozpakowujemy obiekt z danymi
		           var gif = {  // 5. układamy obiekt gif
		                url: data.fixed_width_downsampled_url,
		                sourceUrl: data.url
		            };
		            resolve(gif);  // 6. przekazujemy obiekt do callback
		        } else {
		        	reject(new Error(xhr.statusText));
		        }    
	    	};
	    	xhr.send();
		});
	},

    render: function() {
		var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

   		return (
	        <div style={styles}>
	        <h1>Wyszukiwarka GIFow!</h1>
	        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
	        <Search onSearch={this.handleSearch}/>
		    <Gif 
		        loading={this.state.loading}
		    	url={this.state.gif.url}
		    	sourceUrl={this.state.gif.sourceUrl}
		    />
	        </div>
    	);
    }
});



































// App = React.createClass({

//       <Gif loading={this.state.loading}
//     url={this.state.gif.url}
//     sourceUrl={this.state.gif.sourceUrl}
    


//     getInitialState() {
//       return {
//           loading: false,
//           searchingText: '',
//           gif: {}
//       };
//     },
//     />


//     render: function() {

//         var styles = {
//             margin: '0 auto',
//             textAlign: 'center',
//             width: '90%'
//         };

//         return (
//           <div style={styles}>
//                 <h1>Wyszukiwarka GIFow!</h1>
//                 <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
//                 <Search />
//             <Gif
//                 loading={this.state.loading}
//                 url={this.state.gif.url}
//                 sourceUrl={this.state.gif.sourceUrl}
//             />
//           </div>
//         );
//     }
// });

// <Search onSearch={this.handleSearch}

//  handleSearch: function(searchingText) {
//     this.setState({
//       loading: true
//     });
//     this.getGif(searchingText, function(gif) {  
//       this.setState({
//         loading: false,
//         gif: gif,
//         searchingText: searchingText
//       });
//     }.bind(this));
//     />
 
 

//   getGif: function(searchingText, callback) { 
//     var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
//     var xhr = new XMLHttpRequest();  // 3.
//     xhr.open('GET', url);
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//            var data = JSON.parse(xhr.responseText).data; // 4.
//             var gif = {  // 5.
//                 url: data.fixed_width_downsampled_url,
//                 sourceUrl: data.url
//             };
//             callback(gif);  // 6.
//         }
//     };
//     xhr.send();
// };


// <Gif getInitialState() {
//     return {
//         loading: false,
//         searchingText: '',
//         gif: {}
//     };
// },
//     loading={this.state.loading}
//     url={this.state.gif.url}
//     sourceUrl={this.state.gif.sourceUrl}
// />


