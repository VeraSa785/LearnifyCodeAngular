import { AfterViewInit, Component, ViewChild, ElementRef, Inject, PLATFORM_ID, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { oneDark } from '@codemirror/theme-one-dark';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from "@angular/material/tooltip";

// Custom styling for the editor goes here
const editorHeightStyle = EditorView.theme({
  "&": {
    height: "800px", /* 40 lines * 20px per line */
    maxHeight: "580px",
  },
  ".cm-scroller": {
    overflow: "auto"
  }
});

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTooltip]
})
export class CodeEditorComponent implements AfterViewInit {
  title = 'component-overview';
  buttonDisabled = false;

  @ViewChild('myeditor') myEditor!: ElementRef;
  @Output() codeReviewRequest = new EventEmitter<{ code: string, prompt: string }>(); // EventEmitter to send code and prompt
  private editorView!: EditorView;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initializeEditor(), 0);
    
      setTimeout(() => {
        this.buttonDisabled = false;
        this.cdr.detectChanges(); 
      }, 1000);
    }
  }

  initializeEditor(): void {
    if (typeof document !== 'undefined') {
      let myEditorElement = this.myEditor.nativeElement;
      let myExt: Extension = [basicSetup, javascript(), oneDark, editorHeightStyle];
      let state: EditorState | undefined;

      try {
        state = EditorState.create({
          doc: `print('hello world')`,
          extensions: myExt,
        });
      } catch (e) {
        console.error("Error creating EditorState:", e);
      } finally {
        if (state) {
          this.editorView = new EditorView({
            state,
            parent: myEditorElement,
          });
          console.log("EditorView initialized:", this.editorView);
        } else {
          console.error("EditorState is not defined, Make sure codemirror@6.0.1 is installed.");
        }
      }
    } else {
      console.error("Document is not defined, make sure this is running this in a browser environment");
    }
  }

  reviewCode(): void {
    if (!this.editorView || this.buttonDisabled) {
      console.error("EditorView is not initialized or button is disabled.");
      return;
    }
    
    // Disable the button
    this.buttonDisabled = true;

    const code = this.editorView.state.doc.toString(); // Gets the current content of the editor
    const prompt = 'Please review my code and point out what I did good and next steps to master that topic.';
    this.codeReviewRequest.emit({ code, prompt });

    // Re-enable the button after 5 seconds
    setTimeout(() => {
      this.buttonDisabled = false;
      this.cdr.detectChanges(); // Re-enable detection after button is enabled
    }, 5000); // Adjust the delay as needed
  }
}
