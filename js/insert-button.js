
function test() {
  alert('vao day chua');
}
$(function () {
  let getThis;
  let languages = [
    {
      className: "javascript",
      name: 'JavaScript'
    },
    {
      className: "css",
      name: 'CSS'
    },
    {
      className: "html",
      name: 'HTML'
    },
    {
      className: "cs",
      name: 'C#'
    },
    {
      className: "java",
      name: 'Java'
    },
    {
      className: "json",
      name: 'JSON'
    },
    {
      className: "markdown",
      name: 'Markdown'
    },
    {
      className: "php",
      name: 'PHP'
    },
  ];

  // $.FroalaEditor.DEFAULTS.initOnClick=true;
  $.FroalaEditor.DefineIcon('insert', { NAME: 'file-code' });
  $.FroalaEditor.RegisterCommand('insert', {
    title: 'Code Snipet',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      getThis = this;
      $('#input-code').val("");
      $("#highlight-popup").css("display", "block");

      console.log(getThis);
      // var codeInput = prompt("Please enter your name",);
      // console.log("input", codeInput);
      // if (codeInput != null) {
      //replace (\n) -> <br>
      // var textContent= codeInput.replace(/\n/g,"<br/>");
      // console.log("textContent", textContent);

      // console.log(textContent);
      // move text-content to div container
      // $(".text-container").html("<pre class='js-insert-text'><code>"+ codeInput + "</code></pre>");

      // highlight code of div container
      // $('pre code').each(function(i, block) {
      // console.log(i);
      // hljs.highlightBlock(block);
      // });
      // set attribute : not edit text
      // $('pre.js-insert-text').attr("contenteditable","false");
      // get html code highlighted

      // var getTextHighlighted = $(".text-container").html();
      // console.log(getTextHighlighted);
      // this.html.insert(getTextHighlighted+"<p></p>");
      // this.html.insert("<pre><code>"+ getTextHighlighted + "</code></pre>");

      // this.html.insert(a);
      // 
      // }
    }
  });


  $('textarea#froala-content').froalaEditor({
    // Add the custom buttons in the toolbarButtons list, after the separator.
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo', 'insert']

  })
  //insert language to select
  for (let item of languages) {
    $('#list-language').append(`<option value="${item.className}">${item.name}</option>`)
  }

  // handle event when click submit
  $('.submit').click(function () {
    // get class name of languages
    let lang = $('#list-language').val();
    // get text input
    let codeInput = $('#input-code').val();
    if (codeInput != '') {
      codeInput = codeInput.replace(/'&'/g, '&amp;')
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      console.log('codeInput :', codeInput);
      // move to text-container
      $(".text-container").html(`<pre id='test-new' onclick='test()' class='${lang} hljs js-insert-text'><code>${codeInput} </code></pre>`);
      // highlight code of div container
      $('pre code').each(function (i, block) {
        console.log(i);
        hljs.highlightBlock(block);
      });
      // set attribute : not edit text
      $('pre.js-insert-text').attr("contenteditable", "false");

      // get html code highlighted
      var getTextHighlighted = $(".text-container").html();
      console.log('getTextHighlighted :', getTextHighlighted);

       getThis.html.insert(`<p class='testhl'>${getTextHighlighted}</p><p></p>`);
      // getThis.html.insert("<pre><code>" + getTextHighlighted + "</code></pre>");
      // console.log(codeInput);
      // console.log($('#input-code'));
      $("#highlight-popup").css("display", "none");

    } else {
      alert('Không nhập code rỗng');
    }


  })


  // .replace(/\n/g,"<br/>")

  //handle edit highlight
  // console.log($.FroalaEditor) ;

});
$('.fr-element.fr-view').on('click', function (e) {
  // Do something here.
  console.log(e);
  alert('hh');
});


$('.js-insert-text').on('click', function (e) {
  // Do something here.
  console.log(e);
  alert('hh');
});

$('#test-new').on('click', function () {
  alert('ffd');
})

$('.js-insert-text').on('froalaEditor.click', function (e, editor, clickEvent) {
  // Do something here.
});
