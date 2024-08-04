function setMarkdownTextSize() {
  var currentFontSize = "default"
  document.querySelectorAll('.CodeMirror').forEach(function(editor) {
    if (editor.style.fontSize) {
      if (editor.style.fontSize != "") {
        currentFontSize = editor.style.fontSize
        currentFontSize = currentFontSize.replace("px", "")
      }
    }
  });

  app.dialogs.showInputDialog("Set Markdown Text Font Size in px:",""+currentFontSize).then(function ({buttonId, returnValue}) {
    if (buttonId === 'ok') {
      if ((returnValue == "") || (returnValue=="default")) {
        document.querySelectorAll('.CodeMirror').forEach(function(editor) {
          editor.style.fontSize = ""
        });
        app.toast.info("Markdown font size set to it's default value")
      } else {
        if(!isNaN(Number(returnValue))) {
          document.querySelectorAll('.CodeMirror').forEach(function(editor) {
            editor.style.fontSize = returnValue+'px'
          });
          app.toast.info("Markdown font size set to: "+returnValue)
        } else {
          app.toast.error("Value ["+returnValue+"] is not a valid number.")
        }
      }
    } else {
      app.toast.warning("Set of markdown font size cancelled by the user...")
    }
  })
  return 0
}



function init () {
  app.commands.register('SetMarkdownTextoptions:setMarkdownTextSize', setMarkdownTextSize)
}

exports.init = init