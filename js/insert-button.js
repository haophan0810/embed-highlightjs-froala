
$(function() {
  var getThis;
  $.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
  $.FroalaEditor.RegisterCommand('alert', {
    title: 'Hello',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: function () {
      alert('Hello!');
    }
  });

  $.FroalaEditor.DefineIcon('clear', {NAME: 'remove'});
  $.FroalaEditor.RegisterCommand('clear', {
    title: 'Clear HTML',
    focus: false,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      this.html.set('');
      this.events.focus();
    }
  });

  $.FroalaEditor.DefineIcon('insert', {NAME: 'plus'});
  $.FroalaEditor.RegisterCommand('insert', {
    title: 'Insert HTML',
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      getThis=this;
      console.log(getThis);
      var codeInput = prompt("Please enter your name",);
      console.log("input", codeInput);
      if (codeInput != null) {
        //replace (\n) -> <br>
        var textContent= codeInput.replace(/\n/g,"<br/>");
      console.log("textContent", textContent);
       
        console.log(textContent);
        // move text-content to div container
        $(".text-container").html("<pre class='js-insert-text'><code>"+ codeInput + "</code></pre>");

        // highlight code of div container
        $('pre code').each(function(i, block) {
          console.log(i);
          hljs.highlightBlock(block);
        });
        // set attribute : not edit text
        $('pre.js-insert-text').attr("contenteditable","false");
        // get html code highlighted

        var getTextHighlighted = $(".text-container").html();
        console.log(getTextHighlighted);
        this.html.insert(getTextHighlighted+"<p></p>");
        // this.html.insert("<pre><code>"+ getTextHighlighted + "</code></pre>");
        
        // this.html.insert(a);
        
      }
    }
  });

  $('textarea#froala-content').froalaEditor({
    // Add the custom buttons in the toolbarButtons list, after the separator.
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo','insert']
    
  })
  $('#test-click').click(function(){
    console.log(getThis);
  })
  
});