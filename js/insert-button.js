
let isEdit = false;
let idCodeInput = 1;
let currentCodeEdit = 0;

function modify(dataCodeInput, _this) {
  isEdit = true;
  currentCodeEdit = dataCodeInput;
  // console.log('this :', _this);
  // console.log('this.text() :', $(_this).html());
  let getCodeInput = $(`#code-input-${dataCodeInput} pre code`).text();
  console.log('getCodeInput :', getCodeInput);
  // $('#input-code').html("");
  
  // $('#input-code').html(getCodeInput);

  $('#input-code').val(getCodeInput);
  
  $('#highlight-popup').css('display', 'block');
  // console.log('isEdit :', isEdit);
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
      // focus to textarea popup
      $('#input-code').focus();
      
      console.log(getThis);

    }
  });


  $('textarea#froala-content').froalaEditor({
    // Add the custom buttons in the toolbarButtons list, after the separator.
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline',
      'strikeThrough', 'subscript', 'superscript', '|',
      'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent'
      , 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile',
      'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR',
      'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|',
      'undo', 'redo', 'insert']

  })
  //insert language to select
  for (let item of languages) {
    $('#list-language').append(`<option value="${item.className}">${item.name}</option>`)
  }

  // handle event when click submit
  $('.submit').click(function () {
    // $.FroalaEditor.BLOCK_TAGS = ['address', 'article', 'aside', 'audio', 'blockquote', 'canvas', 'dd',  'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li', 'main', 'nav', 'noscript', 'ol', 'output', 'p', 'pre', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul', 'video'];
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

      $(".text-container")
        .html(`<pre class='${lang} hljs js-insert-text'><code>${codeInput} </code></pre>`);

      // highlight code of div container
      $('pre.js-insert-text code').each(function (i, block) {
        console.log(i);
        hljs.highlightBlock(block);
      });

      // set attribute : not edit text
      $('pre.js-insert-text').attr("contenteditable", "false");

      // get html code highlighted
      var getTextHighlighted = $(".text-container").html();
      // getTextHighlighted.replace(/"<br>"/g,'\n');
      console.log('getTextHighlighted :', getTextHighlighted);

      if (!isEdit) {
        //insert new code
        getThis.html.insert(`<div data-id-code-input='${idCodeInput}'>${getTextHighlighted}</div><p></p>`);
        // insert event double click
        $(`div[data-id-code-input='${idCodeInput}']`).attr('ondblclick', `modify(${idCodeInput},this)`);
        //storage code
        $('#store-code-input')
          .append(`<div id='code-input-${idCodeInput}'><pre><code>${codeInput}</code><pre></div>`);
        idCodeInput += 1;

      } else {
        // edit code highlighted
        isEdit = false;
        // change code edited
        $(`div[data-id-code-input='${currentCodeEdit}']`).html(getTextHighlighted);
        // change code storaged
        $(`#code-input-${currentCodeEdit}`).html(`<pre><code>${codeInput}</code></pre>`);
        console.log('isEdit :', isEdit);
      }
      // getThis.html.insert(`<div data-id-code-input='${idCodeInput}'>${getTextHighlighted}</div><p></p>`);

      // getThis.html.insert(`${getTextHighlighted}<p></p>`);
      // getThis.html.insert("<pre><code>" + getTextHighlighted + "</code></pre>");
      // console.log(codeInput);
      // console.log($('#input-code'));

      // add function modify
      // $(`div[data-id-code-input='${idCodeInput}']`).attr('ondblclick',`modify(${idCodeInput},this)`);

      // move codeInput to store
      // $('#store-code-input')
      // .append(`<div id='code-input-${idCodeInput}'><pre><code>${codeInput}</code><pre></div>`);
      // idCodeInput+=1;
      //close popup
      $("#highlight-popup").css("display", "none");

    } else {
      alert('Không nhập code rỗng');
    }


  })


  // click close

  $('.cancel,.close-icon').click(function () {
    if (isEdit) {
      let dataStore = $(`#code-input-${currentCodeEdit}`).text();
      let dataCurrent = $(`#input-code`).val();
      if (dataStore != dataCurrent) {
        if (confirm("You have changed some options. Are you sure you want to close the dialog window?")) {
          $('#highlight-popup').css("display", "none");
          // $('#input-code').val("");
          

        } else {
         return;
        }
      }
    }
    $('#highlight-popup').css("display", "none");


  })
});
