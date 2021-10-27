// import { Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef } from '@angular/core';
// import { Subscription, merge, of } from 'rxjs';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { LocationEndpointService } from '../services/location-endpoint.service';
// import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, FormControl } from '@angular/forms';
// import * as _ from 'lodash';
// import { LocationEndpointQueryParams } from '@app/modals/query-params/location-endpoints.queryparams';
// import { UtitlityService } from '@app/services/utility.service';
// import { FormsComponent } from './custom-form-components/forms/forms.component';
// import { LocationEndpointCreationMetadata } from '@app/modals/backend/location-endpoint-creation/location-endpoint-creation-metadata';
// import { environment } from 'environments/environment';
// import { APIConstants } from '@app/api/api.constants';
// import { MatChipInputEvent, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { ShareEndpointComponent } from '../../share-endpoint/share-endpoint.component';
// import { Location } from '@angular/common';
// import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
// import * as utils from '../../../utility/utils';
// import { FileModalDriceComponent } from '../../file-modal-drive/file-modal-drive.component';
// import { DomSanitizer } from '@angular/platform-browser';
// import * as fileUtils from './../../../../shared/utility/file-utils';
// import { MultipartService } from '@app/shared/services/multipart-service';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { PaginationData } from '@app/modals/pagination/pagination';
// import { catchError, map, startWith, switchMap } from 'rxjs/operators';
// import { LocationService } from '@app/pages/accounts/account-detail/locations/services/location.service';
// import { SelectionModel } from '@angular/cdk/collections';
// import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { Sentiment } from '@app/modals/bulk-notification/sentiment/sentiment';

// declare var swal: any;

// @Component({
//   selector: 'app-location-endpoint-form',
//   templateUrl: './location-endpoint-form.component.html',
//   styleUrls: ['./location-endpoint-form.component.scss'],
//   // encapsulation: ViewEncapsulation.None
// })
// export class LocationEndpointFormComponent implements OnInit, OnDestroy {
//   showStep = false;
//   showSection = false;
//   editorconfig: AngularEditorConfig = {
//     editable: true,
//     spellcheck: true,
//     height: '15rem',
//     minHeight: '5rem',
//     placeholder: 'Enter text here...',
//     translate: 'no',
//     defaultParagraphSeparator: 'p',
//     defaultFontName: 'Arial',
//     toolbarHiddenButtons: [
//       ['bold']
//     ],
//     customClasses: [
//       {
//         name: "quote",
//         class: "quote",
//       },
//       {
//         name: 'redText',
//         class: 'redText'
//       },
//       {
//         name: "titleText",
//         class: "titleText",
//         tag: "h1",
//       },
//     ]
//   };

//   @ViewChild('locationEndpointForm', { static: false }) locationEndpointForm;

//   @ViewChild('formsComponent', { static: false }) formsComponent: FormsComponent;

//   loader: boolean; // for page laoder
//   isLoading: boolean; // for button loader
//   subscriptions: Subscription[] = [];
//   locationEndpoint: any; // creation metadata
//   selectedEndpointGroup: any = undefined;
//   selectedEndpointType: any = undefined;
//   endpointName: string = undefined;
//   endpointDescription: string = undefined;
//   queryParams: LocationEndpointQueryParams = new LocationEndpointQueryParams();
//   locationEndpointDetail: any; // location endpoint detail
//   formCreationMetadataFetched = false;
//   locationEndpointDetailFetched = false;
//   layouts: any;
//   footerLayouts: any;
//   headerLayouts: any;
//   themes: any;
//   formTypes: any;
//   endPointForm: FormGroup;
//   panelOpenState: boolean;
//   fieldTypes: any;
//   subSection: any;
//   formData = new FormData();
//   getDetail: boolean;
//   isEdit = false;
//   links = {
//     updateGeneralInfo: true,
//     shareLink: false,
//     qrCode: false,
//     importExportData: false,
//     configureForm: false,
//     configurePaymentForm: false,
//     notificationTriggers: false,
//     performance: false
//   }
//   initialSelection = [];
//   allowMultiSelect = true;
//   selection = new SelectionModel(this.allowMultiSelect, this.initialSelection);
//   dataSource: any;
//   displayedColumns: string[] = ['select', 'title', 'email'];
//   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
//   addOnBlur = true;
//   invalidEmailMsg = 'Please enter a valid email address';
//   selectable = true;
//   removable = true;
//   summaryRecordsPerPage: number = 10;

//   constructor(
//     private router: Router,
//     private toaster: ToastrService,
//     private activeRoute: ActivatedRoute,
//     private locationEndpointService: LocationEndpointService,
//     private locationService: LocationService,
//     private utilityService: UtitlityService,
//     private dialog: MatDialog,
//     public location: Location,
//     public config: NgbTabsetConfig,
//     private fb: FormBuilder,
//     private dom: DomSanitizer,
//     private mulipart: MultipartService,
//     private el: ElementRef
//   ) {
//     config.justify = 'justified';
//     this.endPointForm = this.fb.group({
//       name: ['', Validators.required],
//       description: [''],
//       name_show: [false],
//       description_show: [false],
//       endpointType: ['', Validators.required],
//       communication_endpoint_type_id: ['', Validators.required],
//       generate_qr_code: [null],
//       form_endpoint_layout_type_id: ['', Validators.required],
//       form_endpoint_theme_id: ['', Validators.required],
//       show_engagement_platform: [true],
//       form_endpoint_steps: this.fb.array([this.initStep()]),
//       show_header: [false],
//       header_layout: [],
//       footer_layout: [],
//       show_footer: [false],
//       show_header_logo: [false],
//       header_logo_image: [''],
//       header_logo_media_id: [],
//       footer_logo_image: [''],
//       footer_logo_media_id: [],
//       header_show_content: [false],
//       footer_show_content: [false],
//       headerContent: this.fb.array([]),
//       footerContent: this.fb.array([]),
//       show_footer_logo: [false],
//       track_location_on_submit: [false],
//     }, { validators: [this.headerValidator, this.footerValidator, this.headerLogoValidator, this.footerLogoValidator, this.headerContentValidator, this.footerContentValidator] })
//   }
//   headerValidator: ValidatorFn = (fg: FormGroup) => {
//     const header_layout = fg.get('header_layout').value;
//     const show_header = fg.get('show_header').value;
//     return show_header ? (header_layout ? null : { header_layout: false }) : null;
//   };
//   footerValidator: ValidatorFn = (fg: FormGroup) => {
//     const footer_layout = fg.get('footer_layout').value;
//     const show_footer = fg.get('show_footer').value;
//     return show_footer ? (footer_layout ? null : { footer_layout: false }) : null;
//   };
//   headerLogoValidator: ValidatorFn = (fg: FormGroup) => {
//     const header_logo_media_id = fg.get('header_logo_media_id').value;
//     const show_header_logo = fg.get('show_header_logo').value;
//     return show_header_logo ? (header_logo_media_id ? null : { header_logo: false }) : null;
//   };
//   footerLogoValidator: ValidatorFn = (fg: FormGroup) => {
//     const footer_logo_media_id = fg.get('footer_logo_media_id').value;
//     const show_footer_logo = fg.get('show_footer_logo').value;
//     return show_footer_logo ? (footer_logo_media_id ? null : { footer_logo: false }) : null;
//   };
//   headerContentValidator: ValidatorFn = (fg: FormGroup) => {
//     const headerContent = fg.get('headerContent').value;
//     const header_show_content = fg.get('header_show_content').value;
//     return header_show_content ? (headerContent.length > 0 ? null : { header_content: false }) : null;
//   };
//   footerContentValidator: ValidatorFn = (fg: FormGroup) => {
//     const footerContent = fg.get('footerContent').value;
//     const footer_show_content = fg.get('footer_show_content').value;
//     return footer_show_content ? (footerContent.length > 0 ? null : { header_content: false }) : null;
//   };

//   get f() {
//     return this.endPointForm && this.endPointForm.controls
//   }
//   clearHeader(event) {
//     if (!event) {
//       this.endPointForm.controls['header_layout'].patchValue('');
//       this.endPointForm.controls['show_header_logo'].patchValue(false);
//       (this.endPointForm.get('headerContent') as FormArray).clear();
//       this.endPointForm.controls['header_show_content'].patchValue(false);
//       this.endPointForm.controls['header_logo_image'].patchValue('');
//       this.endPointForm.controls['header_logo_media_id'].patchValue('');
//     }
//   }
//   clearFooter(event) {
//     if (!event) {
//       this.endPointForm.controls['footer_layout'].patchValue('');
//       this.endPointForm.controls['show_footer_logo'].patchValue(false);
//       (this.endPointForm.get('footerContent') as FormArray).clear();
//       this.endPointForm.controls['footer_show_content'].patchValue(false);
//       this.endPointForm.controls['footer_logo_image'].patchValue('');
//       this.endPointForm.controls['footer_logo_media_id'].patchValue('');
//     }
//   }
//   clearHeaderContent(event) {
//     if (!event) {
//       (this.endPointForm.get('headerContent') as FormArray).clear();
//     }
//   }
//   clearfooterContent(event) {
//     if (!event) {
//       (this.endPointForm.get('footerContent') as FormArray).clear();
//     }
//   }
//   clearHeaderLogo(event) {
//     if (!event) {
//       this.endPointForm.controls['header_logo_image'].patchValue('');
//       this.endPointForm.controls['header_logo_media_id'].patchValue('');
//     }
//   }
//   clearFooterLogo(event) {
//     if (!event) {
//       this.endPointForm.controls['footer_logo_image'].patchValue('');
//       this.endPointForm.controls['footer_logo_media_id'].patchValue('');
//     }
//   }
//   ngOnInit() {
//     this.getRouteParams();
//     console.log(this.endPointStepFormControls)
//     setTimeout(() => {
//       this.onResize();
//     }, 0);
//     this.dataSource = [
//       { index: 0, validEmail: true, sentiment_id: null, title: 'Any form is submitted', email: [] },
//       { index: 1, validEmail: true, sentiment_id: 1, title: "Submitted form's sentiment analysis is", email: [] },
//       { index: 2, validEmail: true, sentiment_id: 2, title: "Submitted form's sentiment analysis is", email: [] },
//       { index: 3, validEmail: true, sentiment_id: 3, title: "Submitted form's sentiment analysis is", email: [] },
//       { index: 4, validEmail: true, sentiment_id: 4, title: "Submitted form's sentiment analysis is", email: [] },
//       { index: 5, validEmail: true, sentiment_id: 5, title: "Submitted form's sentiment analysis is", email: [] },
//       { index: 6, validEmail: true, sentiment_id: 6, title: "Submitted form's sentiment analysis is", email: [] },
//       { index: 7, validEmail: true, sentiment_id: 7, title: "Submitted form's sentiment analysis is", email: [] },
//     ];
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event?) {
//     let mainDiv = this.el.nativeElement.querySelector("#mainDiv");
//     let sidenav = this.el.nativeElement.querySelector("#sidenav");
//     if (window.innerWidth <= 768) {
//       if (mainDiv.classList.contains('main')) {
//         mainDiv.classList.remove('main');
//         mainDiv.classList.add('mainMobile');
//         let elm = document.querySelector<HTMLElement>('.mainMobile');
//         elm.style.top = ($('.sidenav').height() + 180) + 'px';
//       }
//       let elm = document.querySelector<HTMLElement>('.sidenav');
//       elm.style.width = (window.innerWidth - 41) + 'px';
//     }
//     else {
//       if (mainDiv.classList.contains('mainMobile')) {
//         mainDiv.classList.remove('mainMobile');
//         mainDiv.classList.add('main');
//         let elm = document.querySelector<HTMLElement>('.main');
//         elm.style.top = '110px';
//       }
//       let elm = document.querySelector<HTMLElement>('.sidenav');
//       elm.style.width = '200px';
//     }
//   }

//   initHeaderContent() {
//     return this.fb.group({
//       type: [''],
//       text: [''],
//       link: ['']
//     })
//   }

//   addContent() {
//     const control = <FormArray>this.endPointForm.controls.headerContent;
//     control.push(this.initHeaderContent());
//   }
//   addFooterContent() {
//     const control = <FormArray>this.endPointForm.controls.footerContent;
//     control.push(this.initHeaderContent());
//   }

//   removeContent(i) {
//     const control = <FormArray>this.endPointForm.controls.headerContent;
//     swal({
//       text: "Are you sure want to Delete?",
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     }).then(() => control.removeAt(i));
//   }
//   removeFooterContent(i) {
//     const control = <FormArray>this.endPointForm.controls.footerContent;
//     swal({
//       text: "Are you sure want to Delete?",
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     }).then(() => control.removeAt(i));
//   }

//   moveElements(array, element, delta) {
//     var index = array.indexOf(element);
//     var newIndex = index + delta;
//     if (newIndex < 0 || newIndex == array.length) return; //Already at the top or bottom.
//     var indexes = [index, newIndex].sort(); //Sort the indixes
//     array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
//   };

//   moveDown(array: FormArray, index) {
//     // this.moveElements(array, element, 1);
//     // const extrasFormArray = this.carForm.get('extras') as FormArray;
//     const extras = array.controls;
//     if (index < extras.length - 1) {
//       const newExtras = this.swap(extras, index, index + 1);
//       newExtras.forEach((data, i) => {
//         array.setControl(i, data);
//       })
//     }
//   }
//   moveDownSubsection(array, i, event: Event) {
//     event.stopPropagation();
//     this.moveDown(array, i);
//   }
//   moveUpSubsection(array, i, event: Event) {
//     event.stopPropagation();
//     this.moveUp(array, i)
//   }
//   moveUp(array, index) {
//     // this.moveElements(array, element, -1);
//     if (index > 0) {
//       // const extrasFormArray = this.carForm.get('extras') as FormArray;
//       const extras = array.controls;
//       const newExtras = this.swap(extras, index - 1, index);
//       newExtras.forEach((data, i) => {
//         array.setControl(i, data);
//       })
//     }
//   }
//   swap(arr: any[], index1: number, index2: number): any[] {
//     arr = [...arr];
//     const temp = arr[index1];
//     arr[index1] = arr[index2];
//     arr[index2] = temp;
//     return arr;
//   }

//   initStep(data?) {
//     if (data) {
//       let fb = this.fb.group({
//         id: null,
//         next_step_button_html: null,
//         previous_step_button_html: null,
//         step_description: null,
//         step_name: null,
//         form_endpoint_step_sections: this.fb.array([]),
//       });
//       fb.patchValue(data);
//       return fb;
//     }
//     return this.fb.group({
//       form_endpoint_step_sections: this.fb.array([]),
//     })
//   }

//   initSection(data?) {
//     if (data) {
//       let fb = this.fb.group({
//         form_endpoint_step_subsections: this.fb.array([]),
//         id: null,
//         step_section_description: null,
//         step_section_name: null,
//       });
//       fb.patchValue(data);
//       return fb;
//     }
//     return this.fb.group({
//       form_endpoint_step_subsections: this.fb.array([])
//     })
//   }

//   addStep(data?) {
//     const control = <FormArray>this.endPointForm.controls.form_endpoint_steps;
//     control.push(this.initStep(data));
//     const control2 = (<FormArray>this.endPointForm.controls['form_endpoint_steps']).get('step_name');
//     console.log(control.value)
//     console.log(control)
//     console.log(control2)
//     console.log(this.endPointForm.controls)
//   }

//   editStep(e) {
//     console.log("editstep")
//     this.showStep = !this.showStep;

//   }
//   editSection() {
//     this.showSection = !this.showSection;
//   }

//   get endPointStepFormControls() {
//     return this.endPointForm.controls.form_endpoint_steps;
//   }

//   // hideText(e) {
//   //   e.stopPropagation()
//   //   this.showStep = !this.showStep
//   //   this.showSection = !this.showSection;

//   // }

//   removeStep(i) {
//     event.stopPropagation();
//     const control = <FormArray>this.endPointForm.controls.form_endpoint_steps;
//     swal({
//       text: "Are you sure want to Delete?",
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     }).then(() => control.removeAt(i));
//   }

//   addSection(i, section?) {
//     const control = (<FormArray>this.endPointForm.controls['form_endpoint_steps']).at(i).get('form_endpoint_step_sections') as FormArray;
//     control.push(this.initSection(section));
//   }

//   removeSection(i, j) {
//     event.stopPropagation();
//     const control = (<FormArray>this.endPointForm.controls['form_endpoint_steps']).at(i).get('form_endpoint_step_sections') as FormArray;
//     swal({
//       text: "Are you sure want to Delete?",
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     }).then(() => control.removeAt(j));
//   }

//   initValue(data) {
//     return this.fb.group({
//       id: [data && data.id ? data.id : ''],
//       option_text: [data ? data.option_text : ''],
//       option_value: [data ? data.option_value : ''],
//       is_preselected: [(data && data.is_preselected) ?
//         // data.is_preselected
//         1
//         : 0]
//     })
//   }

//   removeValue(question, index) {
//     event.stopPropagation();
//     swal({
//       text: "Are you sure want to Delete?",
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     }).then(() => question.get("form_endpoint_question_options").removeAt(index));
//   }

//   addValue(question) {
//     question.get("form_endpoint_question_options").push(this.initValue(null));
//   }

//   addControl(field, data, isEdit?) {
//     switch (field) {
//       case 'logo': {
//         return this.fb.group({
//           id: isEdit ? data && data.id : null,
//           logo: [data ? (data.logo_subsection_type_media && data.logo_subsection_type_media.media_url_final_full_url) : ''],
//           logo_subsection_type_media_id: [data ? data.logo_subsection_type_media_id : ''],
//           form_endpoint_step_subsection_type_id: [1],

//         })
//       }
//       case 'text': {
//         return this.fb.group({
//           id: isEdit ? data && data.id : null,
//           text_subsection_type_text: [data ? data.text_subsection_type_text : ''],
//           form_endpoint_step_subsection_type_id: [2]
//         })
//       }
//       case 'image': {
//         return this.fb.group({
//           id: isEdit ? data && data.id : null,
//           image: [data ? data.image_subsection_type_media && data.image_subsection_type_media.media_url_final_full_url : ''],
//           image_subsection_type_media_id: [data ? data.image_subsection_type_media_id : ''],
//           form_endpoint_step_subsection_type_id: [3]
//         })
//       }
//       case 'video': {
//         return this.fb.group({
//           isExternal: [data && data.video_subsection_type_media.media_type.code == 'external_video_link' ? true : false],
//           video: [data ? this.dom.bypassSecurityTrustResourceUrl(data.video_subsection_type_media.media_url_final_full_url) : ''],
//           video_subsection_type_media_id: [data ? data.video_subsection_type_media_id : ''],
//           form_endpoint_step_subsection_type_id: [4],
//           // text_subsection_type_text: [isEdit ? data.text_subsection_type_text : ''],
//           // image_subsection_type_media_id: [isEdit ? data.image_subsection_type_media_id : ''],
//           // audio_subsection_type_media_id: [isEdit ? data.audio_subsection_type_media_id : ''],
//           id: isEdit ? data && data.id : null,
//           // logo_subsection_type_media_id: isEdit ? data.logo_subsection_type_media_id : null,
//           // advertisement_subsection_type_media_id: isEdit ? data.advertisement_subsection_type_media_id : null,
//           // question_subsection_type_question_type_id: isEdit ? data.question_subsection_type_question_type_id : null,
//           // question_subsection_type_data_metric_id: isEdit ? data.question_subsection_type_data_metric_id : null,
//           // question_subsection_type_question_text: isEdit ? data.question_subsection_type_question_text : null,
//           // question_subsection_type_question_code: isEdit ? data.question_subsection_type_question_code : null,
//           // question_subsection_type_answer_min_value: isEdit ? data.question_subsection_type_answer_min_value : null,
//           // question_subsection_type_answer_max_value: isEdit ? data.question_subsection_type_answer_max_value : null,
//           // question_subsection_type_question_is_required: isEdit ? data.question_subsection_type_question_is_required : null,
//           // question_subsection_type_question_is_editable: isEdit ? data.question_subsection_type_question_is_editable : null,
//           // question_subsection_type_question_perform_sentiment_analysis: isEdit ? data.question_subsection_type_question_perform_sentiment_analysis : null,
//           // form_endpoint_payment_subsection_preferences: isEdit ? data.form_endpoint_payment_subsection_preferences : null
//         })
//       }
//       case 'advertisement': {
//         return this.fb.group({
//           isVideo: [null],
//           ad: [data ? data.advertisement_subsection_type_media && data.advertisement_subsection_type_media.media_url_final_full_url : ''],
//           advertisement_subsection_type_media_id: [data ? data.advertisement_subsection_type_media_id : ''],
//           form_endpoint_step_subsection_type_id: [5]
//         })
//       }
//       case 'audio': {
//         return this.fb.group({
//           isExternal: [data && data.audio_subsection_type_media.media_type.code == 'external_audio_link' ? true : false],
//           audio: [data ? this.dom.bypassSecurityTrustResourceUrl(data.audio_subsection_type_media.media_url_final_full_url) : ''],
//           audio_subsection_type_media_id: [data ? data.audio_subsection_type_media_id : ''],
//           form_endpoint_step_subsection_type_id: [7],
//           text_subsection_type_text: [data ? data.text_subsection_type_text : ''],
//           image_subsection_type_media_id: [data ? data.image_subsection_type_media_id : ''],
//           image: [data ? data.image_subsection_type_media && data.image_subsection_type_media.media_url_final_full_url : ''],
//           name: 'audio',
//           id: isEdit ? data && data.id : null,
//           // logo_subsection_type_media_id: isEdit ? data.logo_subsection_type_media_id : null,
//           // video_subsection_type_media_id: isEdit ? data.video_subsection_type_media_id : null,
//           // advertisement_subsection_type_media_id: isEdit ? data.advertisement_subsection_type_media_id : null,
//           // question_subsection_type_question_type_id: isEdit ? data.question_subsection_type_question_type_id : null,
//           // question_subsection_type_data_metric_id: isEdit ? data.question_subsection_type_data_metric_id : null,
//           // question_subsection_type_question_text: isEdit ? data.question_subsection_type_question_text : null,
//           // question_subsection_type_question_code: isEdit ? data.question_subsection_type_question_code : null,
//           // question_subsection_type_answer_min_value: isEdit ? data.question_subsection_type_answer_min_value : null,
//           // question_subsection_type_answer_max_value: isEdit ? data.question_subsection_type_answer_max_value : null,
//           // question_subsection_type_question_is_required: isEdit ? data.question_subsection_type_question_is_required : null,
//           // question_subsection_type_question_is_editable: isEdit ? data.question_subsection_type_question_is_editable : null,
//           // question_subsection_type_question_perform_sentiment_analysis: isEdit ? data.question_subsection_type_question_perform_sentiment_analysis : null,
//           // form_endpoint_payment_subsection_preferences: isEdit ? data.form_endpoint_payment_subsection_preferences : null
//         })
//       }
//       case 'question': {
//         return this.fb.group({
//           question_subsection_type_question_text: [data ? data.question_subsection_type_question_text : '', Validators.required],
//           question_subsection_type_question_code: [data ? data.question_subsection_type_question_code : '', Validators.required],
//           question_subsection_type_question_type_id: [data ? data.question_subsection_type_question_type_id : '', Validators.required],
//           question_subsection_type_data_metric_id: [data ? data.question_subsection_type_data_metric_id : ''],
//           question_subsection_type_answer_min_value: [data ? data.question_subsection_type_answer_min_value : ''],
//           question_subsection_type_answer_max_value: [data ? data.question_subsection_type_answer_max_value : ''],
//           form_endpoint_question_options: this.fb.array([]),
//           question_subsection_type_question_is_required: [data ? data.question_subsection_type_question_is_required : 0],
//           question_subsection_type_question_perform_sentiment_analysis: [data ? data.question_subsection_type_question_perform_sentiment_analysis : 0],
//           form_endpoint_step_subsection_type_id: [6],
//           data_metric: [],
//           image: [''],
//           // question_subsection_type_draw_over_image_question_media_id: [],
//           // video_subsection_type_media_id: [isEdit ? data.video_subsection_type_media_id : ''],
//           // text_subsection_type_text: [isEdit ? data.text_subsection_type_text : ''],
//           // image_subsection_type_media_id: [isEdit ? data.image_subsection_type_media_id : ''],
//           // audio_subsection_type_media_id: [isEdit ? data.audio_subsection_type_media_id : ''],
//           id: isEdit ? data && data.id : null,
//           // logo_subsection_type_media_id: isEdit ? data.logo_subsection_type_media_id : null,
//           // advertisement_subsection_type_media_id: isEdit ? data.advertisement_subsection_type_media_id : null,
//           // question_subsection_type_question_is_editable: isEdit ? data.question_subsection_type_question_is_editable : null,
//           // form_endpoint_payment_subsection_preferences: isEdit ? data.form_endpoint_payment_subsection_preferences : null
//         })
//       }
//       case 'collect_payment':
//         return this.fb.group({
//           id: isEdit ? data && data.id : null,
//           step_section_name: "Complete your payment",
//           step_section_description: "Suitable for collecting payments where customers will fill-in themselves how much amount they want to pay.",
//           form_endpoint_step_id: isEdit ? data.form_endpoint_step_id : null,
//           form_endpoint_step_subsections: this.fb.array([
//             this.fb.group({
//               id: isEdit ? data.form_endpoint_step_subsections.id : null,
//               form_endpoint_step_subsection_type_id: [isEdit ? data.form_endpoint_step_subsections.form_endpoint_step_subsection_type_id : data.form_endpoint_step_subsections.id],
//               form_endpoint_payment_subsection_preferences: this.fb.group({
//                 id: isEdit ? data.form_endpoint_step_subsections.form_endpoint_payment_subsection_preferences && data.form_endpoint_step_subsections.form_endpoint_payment_subsection_preferences.id : null,
//                 payment_amount_type: [data ? data.form_endpoint_step_subsections.form_endpoint_payment_subsection_preferences && data.form_endpoint_step_subsections.form_endpoint_payment_subsection_preferences.payment_amount_type : '', Validators.required],
//                 prefilled_amount: [data ? data.form_endpoint_step_subsections.form_endpoint_payment_subsection_preferences && data.form_endpoint_step_subsections.form_endpoint_payment_subsection_preferences.prefilled_amount : ''],
//                 allowed_payment_methods: [[1]]
//               })
//             })
//           ])
//         })
//       case 'customer_full_name':
//         return this.fb.group({
//           id: isEdit ? data.id : null,
//           form_endpoint_step_subsection_type_id: [data ? data.form_endpoint_step_subsection_types.id : ''],
//           question_subsection_type_question_type_id: [data ? data.form_endpoint_question_types.id : ''],
//           question_subsection_type_question_text: "Your name",
//           question_subsection_type_question_code: "your_name",
//           question_subsection_type_question_is_required: 1,
//           question_subsection_type_question_perform_sentiment_analysis: 0,
//           question_subsection_type_data_metric_id: [data ? data.data_metrics.id : '']
//         })
//       case "customer_email_address":
//         return this.fb.group({
//           id: isEdit ? data.id : null,
//           form_endpoint_step_subsection_type_id: [data ? data.form_endpoint_step_subsection_types.id : ''],
//           question_subsection_type_question_type_id: [data ? data.form_endpoint_question_types.id : ''],
//           question_subsection_type_question_text: "Your email address",
//           question_subsection_type_question_code: "your_email_address",
//           question_subsection_type_question_is_required: 1,
//           question_subsection_type_question_perform_sentiment_analysis: 0,
//           question_subsection_type_data_metric_id: [data ? data.data_metrics.id : '']
//         })
//       case "customer_phone_number":
//         return this.fb.group({
//           id: isEdit ? data.id : null,
//           form_endpoint_step_subsection_type_id: [data ? data.form_endpoint_step_subsection_types.id : ''],
//           question_subsection_type_question_type_id: [data ? data.form_endpoint_question_types.id : ''],
//           question_subsection_type_question_text: "Your phone number",
//           question_subsection_type_question_code: "your_phone_number",
//           question_subsection_type_question_is_required: 1,
//           question_subsection_type_question_perform_sentiment_analysis: 0,
//           question_subsection_type_data_metric_id: [data ? data.data_metrics.id : '']
//         })
//       case 'customer_address':
//         return this.fb.group({
//           id: isEdit ? data.id : null,
//           form_endpoint_step_subsection_type_id: [data ? data.form_endpoint_step_subsection_types.id : ''],
//           question_subsection_type_question_type_id: [data ? data.form_endpoint_question_types.id : ''],
//           question_subsection_type_question_text: "Your address",
//           question_subsection_type_question_code: "your_address",
//           question_subsection_type_question_is_required: 1,
//           question_subsection_type_question_perform_sentiment_analysis: 0,
//           question_subsection_type_data_metric_id: [data ? data.data_metrics.id : '']
//         })
//     }
//   }

//   addSubSection(section, event) {
//     section.get("form_endpoint_step_subsections").push(this.addControl(event.code, null));
//     // section.get("form_endpoint_step_subsections").push(this.addControl(event.value, null));
//     // event.value = '';
//   }

//   removeSubSection(section, index) {
//     event.stopPropagation();
//     swal({
//       text: "Are you sure want to Delete?",
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     }).then(() => section.get("form_endpoint_step_subsections").removeAt(index));
//   }

//   initQuestionCode(question) {
//     let code = utils.insertUnderscoreForSpace(question.get('question_subsection_type_question_text').value).toLowerCase();
//     question.get('question_subsection_type_question_code').setValue(code);
//   }

//   ifQuestionAvailable(subsection) {
//     let data = [];
//     data = this.locationEndpoint && this.locationEndpoint.form_endpoint_step_subsection_types.filter(a => a.id === subsection.value.form_endpoint_step_subsection_type_id)
//     if (data[0].name == 'Question' && subsection.value.question_subsection_type_question_text) {
//       return true;
//     }
//   }

//   onDataMetric(event, question) {
//     question.get("question_subsection_type_question_type_id").setValue('');
//     question.get("question_subsection_type_data_metric_id").setValue('');
//     question.get("question_subsection_type_data_metric_id").setValue(event.value.id);

//     const control = <FormArray>question.get("form_endpoint_question_options");
//     for (let i = control.length - 1; i >= 0; i--) control.removeAt(i);

//     let type = event.value.data_metric_form_endpoint_question_type_map[0].engagement_form_question_type;
//     question.get("question_subsection_type_question_type_id").setValue(type.id);
//     if (type.code == 'radio' || type.code == 'checkbox' || type.code == 'drop_down_list') {
//       for (let index = 0; index < event.value.data_metric_option_values.length; index++) {
//         question.get("form_endpoint_question_options").push(this.initValue(event.value.data_metric_option_values[index]));
//       }
//     }
//   }

//   setPreselect(array, option, event?) {
//     // checkbox value
//     if (event) {
//       option.get('is_preselected').setValue(event.checked ? 1 : 0);
//     }
//     else {
//       array.controls.form_endpoint_question_options.controls.forEach(element => {
//         element.get('is_preselected').setValue(0);
//       });
//       option.get('is_preselected').setValue(1);
//     }
//   }

//   isQuestionEdit(control) {
//     if (control) {
//       if (control.code == 'customer_gender' || control.code == 'customer_preference_whatsapp_opt_in' || control.code == 'customer_preference_phone_opt_in' || control.code == 'customer_preference_email_opt_in' || control.code == 'customer_martial_status' || control.code == 'customer_hobbies') return false;
//     }
//     else return true;
//   }

//   getRouteParams() {
//     this.queryParams = new LocationEndpointQueryParams();
//     const activeCompany = this.utilityService.getLocalStorage('activeCompanyUser');
//     if (activeCompany && activeCompany.uuid) this.queryParams.company_uuid = activeCompany.company.uuid;
//     this.subscriptions.push(this.activeRoute.params.subscribe(
//       (param: Params) => {
//         if (param.id) this.queryParams.company_account_uuid = param.id;
//         if (param.loc_id) this.queryParams.account_location_uuid = param.loc_id;
//         if (param.endpoint_id) {
//           this.queryParams.endpoint_uuid = param.endpoint_id;
//           this.getDetail = true;
//         }
//         this.getFormData(this.getDetail);
//         // this.getImportHistoryDetails();
//       }
//     ));
//   }

//   checkMetadata(event, source, stepSectionData?) {
//     let stepSections = this.endPointForm.get('form_endpoint_steps')['controls'][0].get('form_endpoint_step_sections') as FormArray
//     if (event.value.code === 'payment_form') {
//       if (!this.locationEndpoint.other_metadata.communication_endpoint_groups.forms.communication_endpoint_types.payment_form.allowed) {
//         swal({
//           text: `Please complete the receiving payment process in your account preferences to start collecting payments via Thaut platform:`,
//           type: 'warning',
//           width: 600,
//           showCancelButton: true,
//           showConfirmButton: true,
//           cancelButtonText: 'Close',
//           confirmButtonText: 'Go to account preferences <i class="fas fa-arrow-right"></i>',
//           reverseButtons: true
//         })
//           .then((willNavigate) => {
//             if (willNavigate) {
//               this.router.navigate([`/accounts/update/${this.queryParams.company_account_uuid}`, { preferences: true }]);
//             }
//           }, error => {
//             this.endPointForm.get('communication_endpoint_type_id').reset({ code: null });
//           });
//       } else {
//         if (source === 'add') {
//           stepSections['controls'].length = 0;
//           const form_endpoint_step_subsection_types = this.locationEndpoint.form_endpoint_step_subsection_types.find(subsection_types => subsection_types.code === 'collect_payment');
//           const alreadyChecked = [
//             { question_subsection_type_data_metric: { code: 'customer_email_address' } },
//             { question_subsection_type_data_metric: { code: 'customer_phone_number' } }
//           ]
//           let data = {
//             form_endpoint_step_subsections: {
//               ...form_endpoint_step_subsection_types
//             }
//           }
//           stepSections.push(this.initCustomerInfo(alreadyChecked));
//           stepSections.push(this.addControl('collect_payment', data))
//         } else {
//           if (stepSectionData.form_endpoint_step_subsections[0].form_endpoint_step_subsection_type.code === "collect_payment") {
//             let data = {
//               id: stepSectionData.id,
//               form_endpoint_step_id: stepSectionData.form_endpoint_step_id,
//               form_endpoint_step_subsections: {
//                 ...stepSectionData.form_endpoint_step_subsections[0], form_endpoint_step_subsection_type_id: stepSectionData.form_endpoint_step_subsections[0].form_endpoint_step_subsection_type_id
//               }
//             }
//             stepSections.push(this.addControl('collect_payment', data, true));
//           } else {
//             stepSections['controls'].length = 0;
//             stepSections.push(this.initCustomerInfo(stepSectionData.form_endpoint_step_subsections, stepSectionData));
//           }
//         }
//       }
//     }
//     if (event.value.code === 'general_form') {
//       stepSections['controls'].length = 0;
//       stepSections.push(this.initSection());
//     }
//   }

//   initCustomerInfo(checkBox, stepSectionData?) {
//     let group = this.fb.group({
//       step_section_name: "Customer information",
//       step_section_description: "Please fill-in your details below:",
//       form_endpoint_step_subsections: this.fb.array([
//       ])
//     })
//     if (stepSectionData) {
//       group.addControl('id', new FormControl(stepSectionData.id));
//       group.addControl('form_endpoint_step_id', new FormControl(stepSectionData.form_endpoint_step_id));
//     }
//     let arr = <FormArray>group.get('form_endpoint_step_subsections')
//     for (let data of checkBox) {
//       let code = data.question_subsection_type_data_metric.code
//       arr.push(this.addControl(code, this.getMetricsData(code, stepSectionData ? data.id : false), stepSectionData ? true : false))
//     }
//     return group
//   }

//   getMetricsData(code, id?) {
//     switch (code) {
//       case 'customer_full_name':
//         return {
//           id: id ? id : null,
//           form_endpoint_step_subsection_types: this.locationEndpoint.form_endpoint_step_subsection_types.find(subsection_types => subsection_types.code === "question"),
//           form_endpoint_question_types: this.locationEndpoint.form_endpoint_question_types.find(question_type => question_type.code === "text"),
//           data_metrics: this.locationEndpoint.data_metrics.find(data_metric => data_metric.code === "customer_full_name")
//         }
//       case 'customer_email_address':
//         return {
//           id: id ? id : null,
//           form_endpoint_step_subsection_types: this.locationEndpoint.form_endpoint_step_subsection_types.find(subsection_types => subsection_types.code === "question"),
//           form_endpoint_question_types: this.locationEndpoint.form_endpoint_question_types.find(question_type => question_type.code === "text"),
//           data_metrics: this.locationEndpoint.data_metrics.find(data_metric => data_metric.code === "customer_email_address")
//         }
//       case 'customer_phone_number':
//         return {
//           id: id ? id : null,
//           form_endpoint_step_subsection_types: this.locationEndpoint.form_endpoint_step_subsection_types.find(subsection_types => subsection_types.code === "question"),
//           form_endpoint_question_types: this.locationEndpoint.form_endpoint_question_types.find(question_type => question_type.code === "text"),
//           data_metrics: this.locationEndpoint.data_metrics.find(data_metric => data_metric.code === "customer_phone_number")
//         }
//       case 'customer_address':
//         return {
//           id: id ? id : null,
//           form_endpoint_step_subsection_types: this.locationEndpoint.form_endpoint_step_subsection_types.find(subsection_types => subsection_types.code === "question"),
//           form_endpoint_question_types: this.locationEndpoint.form_endpoint_question_types.find(question_type => question_type.code === "text"),
//           data_metrics: this.locationEndpoint.data_metrics.find(data_metric => data_metric.code === "customer_address")
//         }
//     }
//   }

//   getFormData(isDetail) {
//     this.loader = true;
//     this.subscriptions.push(
//       this.locationEndpointService.getLocationEndpointFormMetadata(
//         this.queryParams.company_uuid, this.queryParams.company_account_uuid).subscribe(
//           (response) => {
//             if (response.status === 'ok') {
//               this.locationEndpoint = response['data'];
//               for (var i = 0; i < this.dataSource.length; i++) {
//                 for (var j = 0; j < this.locationEndpoint.sentiments.length; j++) {
//                   if (this.dataSource[i].sentiment_id == this.locationEndpoint.sentiments[j].id) {
//                     this.dataSource[i].name = this.locationEndpoint.sentiments[j].name;
//                     this.dataSource[i].code = this.locationEndpoint.sentiments[j].code;
//                   }
//                 }
//               }
//               this.layouts = this.locationEndpoint.form_endpoint_layout_types;
//               this.themes = this.locationEndpoint.form_endpoint_themes;
//               this.formTypes = this.locationEndpoint.form_step_types;
//               this.formCreationMetadataFetched = true;
//               this.loader = false;
//               this.footerLayouts = this.locationEndpoint.form_endpoint_footer_layouts;
//               this.headerLayouts = this.locationEndpoint.form_endpoint_header_layouts;
//               if (isDetail) this.getEndpointDetails();
//             } else {
//               this.loader = false;
//             }
//           },
//           (error) => {
//             // error handling
//             this.toaster.error(error.error.message ? error.error.message : error.message ? error.message : 'Some technical issue');
//             this.loader = false;
//           }
//         )
//     );
//   }
//   tabHistory(event) {
//   }
//   getEndpointDetails() {
//     this.loader = true;
//     this.subscriptions.push(
//       this.locationEndpointService.getLocationEndpointDetails(this.queryParams.endpoint_uuid).subscribe(
//         (response) => {
//           if (response.status === 'ok') {
//             this.locationEndpointDetail = response['data'];
//             if (this.locationEndpointDetail) {
//               if (this.locationEndpointDetail.id) {
//                 this.queryParams.endpointFormCreationMetadataId = this.locationEndpointDetail.id;
//               }
//               if (this.locationEndpointDetail['company_account_location_form']) {
//                 this.queryParams.endpointFormId = this.locationEndpointDetail['company_account_location_form']['id'];
//               }
//             }
//             this.locationEndpointDetailFetched = true;
//             this.isEdit = true;
//             if (this.locationEndpointDetail.form_endpoint && this.locationEndpointDetail.form_endpoint.form_endpoint_notifications && this.locationEndpointDetail.form_endpoint.form_endpoint_notifications.length > 0) {
//               this.updateNotificationTriggers(this.locationEndpointDetail.form_endpoint.form_endpoint_notifications);
//             }
//             this.patchForm(this.locationEndpointDetail);
//             this.loader = false;
//           } else {
//             this.loader = false;
//           }
//         },
//         (error) => {
//           // error handling
//           this.toaster.error(error.error.message ? error.error.message : error.message ? error.message : 'Some technical issue');
//           this.loader = false;
//         }
//       )
//     );
//   }

//   updateNotificationTriggers(response) {
//     for (var i = 0; i < response.length; i++) {
//       for (var j = 0; j < this.dataSource.length; j++) {
//         if (response[i].sentiment_id == this.dataSource[j].sentiment_id) {
//           this.dataSource[j].email = response[i].target_emails;
//           this.selection.select(this.dataSource[j]);
//         }
//       }
//     }
//   }

//   patchForm({ name, description, form_endpoint, communication_endpoint_type, qr_code, name_show, description_show, show_engagement_platform }) {
//     let enpoint = this.locationEndpoint.communication_endpoint_groups.filter(data => data.id == communication_endpoint_type.communication_endpoint_group_id);
//     let enpointSubtype = enpoint[0].communication_endpoint_types.filter(data => data.code == communication_endpoint_type.code);
//     this.endPointForm.patchValue({
//       name,
//       description,
//       endpointType: enpoint[0],
//       communication_endpoint_type_id: enpointSubtype[0],
//       form_endpoint_layout_type_id: form_endpoint.form_endpoint_layout_type_id,
//       form_endpoint_theme_id: form_endpoint.form_endpoint_theme_id,
//       generate_qr_code: qr_code ? true : false,
//       name_show: name_show ? true : false,
//       show_engagement_platform: show_engagement_platform ? true : false,
//       description_show: description_show ? true : false,
//       track_location_on_submit: form_endpoint.track_location_on_submit == 0 ? false : true,
//       footer_layout: form_endpoint.footer_layout,
//       header_layout: form_endpoint.header_layout,
//       show_header: form_endpoint.header_show,
//       show_footer: form_endpoint.footer_show,
//       show_footer_logo: form_endpoint.footer_show_logo,
//       show_header_logo: form_endpoint.header_show_logo,
//       footer_show_content: form_endpoint.footer_show_content,
//       header_show_content: form_endpoint.header_show_content,
//       header_logo_media_id: form_endpoint.header_logo_media_id,
//       footer_logo_media_id: form_endpoint.footer_logo_media_id,
//       header_logo_image: form_endpoint.header_logo_media ? form_endpoint.header_logo_media.media_url_saved_full_url : '',
//       footer_logo_image: form_endpoint.footer_logo_media ? form_endpoint.footer_logo_media.media_url_saved_full_url : '',

//     })
//     let footer_content = <FormArray>this.endPointForm.controls.footerContent;
//     form_endpoint.footer_content && form_endpoint.footer_content.forEach(element => {
//       footer_content.push(this.fb.group({
//         type: [element.type],
//         text: [element.text],
//         link: [element.link]
//       }))
//     });
//     let header_content = <FormArray>this.endPointForm.controls.headerContent;
//     form_endpoint.header_content && form_endpoint.header_content.forEach(element => {
//       header_content.push(this.fb.group({
//         type: [element.type],
//         text: [element.text],
//         link: [element.link]
//       }))
//     });
//     let step = <FormArray>this.endPointForm.controls.form_endpoint_steps;
//     step.removeAt(0)
//     form_endpoint.form_endpoint_steps && form_endpoint.form_endpoint_steps.forEach((step, stepindex) => {
//       this.addStep(step);
//       const control = (<FormArray>this.endPointForm.controls['form_endpoint_steps']).at(stepindex).get('form_endpoint_step_sections') as FormArray;
//       control.removeAt(0);
//       if (enpointSubtype[0].code === 'payment_form') {
//         this.addSection(0);
//         let data = { value: { code: enpointSubtype[0].code } }
//         step.form_endpoint_step_sections.forEach(subsection => {
//           this.checkMetadata(data, 'updated', subsection);
//         });
//       }
//       if (enpointSubtype[0].code === 'general_form') {
//         step.form_endpoint_step_sections && step.form_endpoint_step_sections.forEach((section, secindex) => {
//           this.addSection(stepindex, section);
//           section.form_endpoint_step_subsections && section.form_endpoint_step_subsections.forEach((subsection, subsecindex) => {
//             const subsections = <FormArray>control.controls[0].get('form_endpoint_step_subsections');
//             let code = subsection.form_endpoint_step_subsection_type.code;
//             subsections.push(this.addControl(code, subsection, true));
//             if (code == 'question') {
//               const metric = <FormArray>subsections.controls[subsecindex].get('data_metric');
//               const ct = <FormArray>subsections.controls[subsecindex].get('form_endpoint_question_options');
//               for (let index = 0; index < subsection.form_endpoint_question_options.length; index++) {
//                 ct && ct.push(this.initValue(subsection.form_endpoint_question_options[index]));
//               }
//               if (metric && subsection.question_subsection_type_data_metric) {
//                 let code = subsection.question_subsection_type_data_metric.code;
//                 let mt = this.locationEndpoint.data_metrics.filter(data => data.code == code);
//                 metric.patchValue(mt[0])
//               }
//             }
//           });
//         });
//       }
//     });
//   }

//   chooseMedia(type, subsection, control, image) {
//     const dialogRef = this.dialog.open(FileModalDriceComponent, {
//       width: '1000px',
//       panelClass: 'switcher-panel',
//       data: { tab: type, account_location_uuid: this.queryParams.account_location_uuid }
//     });
//     dialogRef.afterClosed().subscribe((result: any) => {
//       if (result) {
//         subsection.get(control).setValue(result[0].id);
//         let url = result[0].media_url_saved_full_url ? result[0].media_url_saved_full_url : result[0].media_url_external
//         if (type == 'advertisements') {
//           if (result[0].media_url_external) {
//             subsection.get('isVideo').setValue('true');
//             subsection.get(image).setValue(this.dom.bypassSecurityTrustResourceUrl(url));
//           } else {
//             subsection.get('isVideo').setValue('false');
//             subsection.get(image).setValue(url);
//           }
//         } else if (type == 'videos') {
//           if (result[0].media_type.code == 'external_video_link') subsection.get('isExternal').setValue(true);
//           else subsection.get('isExternal').setValue(false);
//           subsection.get(image).setValue(this.dom.bypassSecurityTrustResourceUrl(url));
//         } else if (type == 'audio') {
//           if (result[0].media_type.code == 'external_audio_link') subsection.get('isExternal').setValue(true);
//           else subsection.get('isExternal').setValue(false);
//           subsection.get(image).setValue(this.dom.bypassSecurityTrustResourceUrl(url));
//         } else subsection.get(image).setValue(url);
//       }
//     });
//   }

//   removeImage(subsection, image, image_subsection_type_media_id) {
//     event.stopPropagation();
//     swal({
//       text: "Are you sure want to Delete?",
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     }).then(() => {
//       subsection.get(image).setValue('');
//       subsection.get(image_subsection_type_media_id).setValue('');
//     });
//   }

//   submitForm() {
//     // this.queryParams.company_uuid, this.queryParams.company_account_uuid
//     this.endPointForm.value.company_uuid = this.queryParams.company_uuid;
//     this.endPointForm.value.company_account_uuid = this.queryParams.company_account_uuid;
//     this.endPointForm.value.account_location_uuid = this.queryParams.account_location_uuid;
//     let form_endpoint = {
//       form_endpoint_layout_type_id: this.endPointForm.value.form_endpoint_layout_type_id,
//       form_endpoint_theme_id: this.endPointForm.value.form_endpoint_theme_id,
//       form_endpoint_steps: this.endPointForm.value.form_endpoint_steps,
//       footer_layout: this.endPointForm.value.footer_layout,
//       header_layout: this.endPointForm.value.header_layout,
//       header_show: +this.endPointForm.value.show_header,
//       footer_show: +this.endPointForm.value.show_footer,
//       footer_show_logo: +this.endPointForm.value.show_footer_logo,
//       header_show_logo: +this.endPointForm.value.show_header_logo,
//       footer_content: this.endPointForm.value.footerContent,
//       header_content: this.endPointForm.value.headerContent,
//       footer_show_content: +this.endPointForm.value.footer_show_content,
//       header_show_content: +this.endPointForm.value.header_show_content,
//       header_logo_media_id: this.endPointForm.value.header_logo_media_id,
//       footer_logo_media_id: this.endPointForm.value.footer_logo_media_id,
//       track_location_on_submit: +this.endPointForm.value.track_location_on_submit
//     }

//     this.endPointForm.value.form_endpoint = { ...form_endpoint };
//     this.endPointForm.value.generate_qr_code = this.endPointForm.value.generate_qr_code == true ? 1 : 0;
//     this.endPointForm.value.show_engagement_platform = this.endPointForm.value.show_engagement_platform == true ? 1 : 0;
//     this.endPointForm.value.name_show = this.endPointForm.value.name_show == true ? 1 : 0;
//     this.endPointForm.value.description_show = this.endPointForm.value.description_show == true ? 1 : 0;
//     this.endPointForm.value.communication_endpoint_type_id = this.endPointForm.value.communication_endpoint_type_id.id;



//     // delete this.endPointForm.value.endpointType;
//     // delete this.endPointForm.value.form_endpoint_theme_id;
//     // delete this.endPointForm.value.form_endpoint_layout_type_id;
//     // delete this.endPointForm.value.form_endpoint_steps
//     // delete this.endPointForm.value.header_layout
//     // delete this.endPointForm.value.footer_layout
//     // delete this.endPointForm.value.show_header
//     // delete this.endPointForm.value.show_footer
//     // delete this.endPointForm.value.show_footer_logo
//     // delete this.endPointForm.value.show_header_logo
//     // delete this.endPointForm.value.headerContent
//     // delete this.endPointForm.value.footerContent
//     // delete this.endPointForm.value.footer_show_content
//     // delete this.endPointForm.value.header_show_content
//     // delete this.endPointForm.value.header_logo_image
//     // delete this.endPointForm.value.header_logo_media_id
//     // delete this.endPointForm.value.footer_logo_image
//     // delete this.endPointForm.value.footer_logo_media_id
//     // delete this.endPointForm.value.track_location_on_submit

//     this.endPointForm.value.form_endpoint.form_endpoint_notifications = [];
//     if (this.selection.selected.length > 0) {
//       for (var i = 0; i < this.selection.selected.length; i++) {
//         if (!this.selection.selected[i].sentiment_id) {
//           this.endPointForm.value.form_endpoint.form_endpoint_notifications.push({
//             notification_type: 'email',
//             notification_trigger: 'after_form_submission',
//             sentiment_id: null,
//             target_emails: this.selection.selected[i].email,
//           });
//         }
//         else {
//           this.endPointForm.value.form_endpoint.form_endpoint_notifications.push({
//             notification_type: 'email',
//             notification_trigger: 'after_form_submission_evaluated_sentiment',
//             sentiment_id: this.selection.selected[i].sentiment_id,
//             target_emails: this.selection.selected[i].email,
//           });
//         }
//       }
//     }
//     this.loader = true;
//     this.isLoading = true;
//     if (!this.queryParams.endpoint_uuid) {
//       this.locationEndpointService.createLocationEndpoint(this.endPointForm.value).subscribe((response) => {
//         if (response.status != 'ok') return;
//         this.toaster.success(response.message);
//         this.loader = false;
//         this.isLoading = false;
//         this.router.navigate([
//           '/accounts/' + this.queryParams.company_account_uuid + '/locations/' + this.queryParams.account_location_uuid + '/view/endpoints'
//         ]);
//       }, error => {
//         this.toaster.error(error.error.message ? error.error.message : error.message ? error.message : 'Some technical issue');
//         this.loader = false;
//         this.isLoading = false;
//       })
//     }
//     else {
//       // this.endPointForm.value.description = '';
//       this.locationEndpointService.updateLocationEndpoint(this.endPointForm.value, this.queryParams.endpoint_uuid).subscribe((response) => {
//         if (response.status != 'ok') return;
//         this.toaster.success(response.message);
//         this.loader = false;
//         this.isLoading = false;
//         this.router.navigate([
//           '/accounts/' + this.queryParams.company_account_uuid + '/locations/' + this.queryParams.account_location_uuid + '/view/endpoints'
//         ]);
//       }, error => {
//         this.toaster.error(error.error.message ? error.error.message : error.message ? error.message : 'Some technical issue');
//         this.loader = false;
//         this.isLoading = false;
//       })
//     }

//     console.log(this.endPointForm)
//   }

//   updateForm() {
//     if (this.selectedEndpointGroup.code === 'forms') {
//       this.isLoading = true;
//       this.loader = true;
//       this.subscriptions.push(
//         this.locationEndpointService.updateLocationEndpoint(
//           new LocationEndpointCreationMetadata().setLocationEndpointCreationMetadata(
//             this.queryParams, this.selectedEndpointType.id, this.endpointName,
//             (this.formsComponent && this.formsComponent.formCards) ? this.formsComponent.formCards : [], this.endpointDescription
//           ), this.queryParams.endpoint_uuid
//         ).subscribe(
//           (response) => {
//             if (response.status === 'ok') {
//               this.toaster.success(response.message);
//               this.loader = false;
//               this.isLoading = false;
//               this.router.navigate([
//                 '/accounts/' + this.queryParams.company_account_uuid + '/locations/' + this.queryParams.account_location_uuid + '/view/endpoints'
//               ]);
//             } else {
//               this.loader = false;
//               this.isLoading = false;
//             }
//           },
//           (error) => {
//             // error handling
//             // this.toaster.error(error.error.message ? error.error.message : error.message ? error.message : 'Some technical issue');
//             this.toaster.error(
//               error.error.errors.message ? (error.error.errors.message) :
//                 (error.error.message ? (error.error.message) :
//                   (error.message ? (error.message) :
//                     ('Some technical issue'))), 'Error in update'
//             );
//             this.loader = false;
//             this.isLoading = false;
//           }
//         )
//       );
//     } else {
//       this.toaster.info('Will be available soon for endpoint types other than forms', 'Work in Progress');
//     }
//   }

//   viewEndpointDetails() {
//     window.open(environment.ENGAGE_API_ENDPOINT_LOCATION_ENDPOINT_DETAIL +
//       APIConstants.COMPANY_ACCOUNT_LOCATION_ENDPOINTS + APIConstants.SLASH + this.queryParams.endpoint_uuid, '_blank');
//   }

//   onShareEndpointLinkClick() {
//     if (this.dialog && this.dialog.openDialogs && this.dialog.openDialogs.length > 0) {
//       return;
//     } else {
//       this.openShareEndpointDialog();
//     }
//   }

//   openShareEndpointDialog() {
//     const dialogRef = this.dialog.open(ShareEndpointComponent, {
//       width: '600px',
//       data: {
//         url: (this.locationEndpointDetail && this.locationEndpointDetail.bitly_url)
//           ? this.locationEndpointDetail.bitly_url : (this.locationEndpointDetail && this.locationEndpointDetail.engagement_platform_url)
//             ? this.locationEndpointDetail.engagement_platform_url : null,
//         endpoint_id: this.queryParams.endpoint_uuid
//       },
//       panelClass: 'share-endpoint-panel'
//     });
//     this.subscriptions.push(
//       dialogRef.afterClosed().subscribe(
//         (result) => {
//           if (result) {
//             this.shareEndpointLink(result);
//           } else {
//             // do nothing
//           }
//         }
//       )
//     );
//   }

//   shareEndpointLink(data: { phone: string, email: string }) {
//     this.loader = true;
//     this.subscriptions.push(
//       this.locationEndpointService.shareEndpointLink(this.queryParams.endpoint_uuid, data).subscribe(
//         (response) => {
//           if (response.status === 'ok') {
//             this.loader = false;
//           } else {
//             this.loader = false;
//           }
//         },
//         (error) => {
//           // error handling
//           this.toaster.error(error.error.message ? error.error.message : error.message ? error.message : 'Some technical issue');
//           this.loader = false;
//         }
//       )
//     );
//   }

//   goBack() {
//     this.location.back();
//   }

//   copyLinkToClipboard(url) {
//     const selBox = document.createElement('textarea');
//     selBox.style.position = 'fixed';
//     selBox.style.left = '0';
//     selBox.style.top = '0';
//     selBox.style.opacity = '0';
//     selBox.value = url;
//     document.body.appendChild(selBox);
//     selBox.focus();
//     selBox.select();
//     document.execCommand('copy');
//     document.body.removeChild(selBox);
//     this.toaster.success('Url copied to clipboard.');
//   }

//   generateQR() {
//     this.loader = true;
//     let obj = { endpoint_uuid: this.queryParams.endpoint_uuid };
//     this.locationEndpointService.createQR(obj, this.queryParams.endpoint_uuid).subscribe((response: any) => {
//       if (response.status != 'ok') return;
//       this.loader = false;
//       this.getRouteParams();
//     }, error => {
//       this.loader = false;
//       this.toaster.error(error.error.message ? error.error.message : error.message ? error.message : 'Some technical issue');
//     })
//   }

//   onToogleCheckbox(event, subsection, control) {
//     if (event.checked) subsection.get(control).setValue(1);
//     else subsection.get(control).setValue(0);
//   }

//   downloadEndpoint() {
//     this.loader = true;
//     let obj = { format: 'excel' }
//     this.subscriptions.push(
//       this.locationEndpointService.getExcelFile(obj, this.queryParams.endpoint_uuid).subscribe(
//         (response: any) => {
//           this.loader = false;
//           fileUtils.downloadXls(response, 'endpoint');
//         })
//     );
//   }


//   inputChange(event) {
//     let fileList = event.target.files;
//     let file: any = fileList[0];
//     let fileSize: number = fileList[0].size;
//     if (fileSize > 16777216) {
//       this.toaster.error('This file is too large to upload. The maximum supported file sizes are 16 MB');
//       return
//     }
//     swal({
//       input: 'checkbox',
//       inputPlaceholder: ' Also send automatic system responses to customers',
//       inputValue: 1,
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Import Responses',
//       cancelButtonText: 'Cancel'
//     }).then((data) => {
//       if (data) this.importEndpoint(file);
//     }, error => { });
//   }

//   importEndpoint(file: any) {
//     this.loader = true;
//     let formData = new FormData();
//     formData.append('format', 'excel');
//     formData.append('response_file', file);
//     this.mulipart.uploadFile(formData, this.queryParams.endpoint_uuid).subscribe((response: any) => {
//       this.loader = false;
//       if (response.status != 'ok') return;
//       this.toaster.success(response.message);
//     }, error => {
//       this.loader = false;
//       this.toaster.error(error.error.message ? error.error.message : error.message ? error.message : 'Some technical issue');
//     })
//   }
//   deleteEndpoint() {
//     swal({
//       text: `Are you sure want to Delete ${this.endPointForm.value.name} endpoint`,
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     })
//       .then((willDelete) => {
//         if (willDelete) {
//           this.locationService.deleteEndpoint(this.queryParams.endpoint_uuid).subscribe(res => {
//             this.router.navigate([
//               '/accounts/' + this.queryParams.company_account_uuid + '/locations/' + this.queryParams.account_location_uuid + '/view/endpoints'
//             ]);
//             this.toaster.success(res['message']);
//           }, err => {
//             this.toaster.warning(err.message);
//           });
//         }
//       }, error => {
//         console.log(error);
//       });
//   }

//   duplicateEndpoint() {
//     swal({
//       text: `Are you sure want to Duplicate ${this.endPointForm.value.name} endpoint`,
//       type: 'warning',
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     })
//       .then((willDuplicate) => {
//         if (willDuplicate) {
//           let data = {
//             endpoint_uuid: this.locationEndpointDetail.uuid
//           }
//           this.locationService.duplicateEndpoint(data).subscribe(res => {
//             this.router.navigate([
//               '/accounts/' + this.queryParams.company_account_uuid + '/locations/' + this.queryParams.account_location_uuid + '/endpoints/' + res.data.uuid + '/edit'
//             ]);
//             this.toaster.success(res['message']);
//           }, err => {
//             this.toaster.warning(err.message);
//           });
//         }
//       }, error => {
//         console.log(error);
//       });
//   }

//   getSectionType(subsection) {
//     let data = [];
//     // if(subsection.controls.question_subsection_type_question_type_id){
//     data = this.locationEndpoint && this.locationEndpoint.form_endpoint_step_subsection_types.filter(a => a.id === subsection.value.form_endpoint_step_subsection_type_id)
//     // }
//     return data.length > 0 && data[0].name
//   }
//   ngOnDestroy() {
//     // unsubscribing all the subscriptions
//     this.subscriptions.forEach(s => s.unsubscribe());
//   }
//   openLink(link) {
//     for (var i in this.links) {
//       this.links[i] = false;
//     }
//     this.links[link] = true;
//   }

//   /** Whether the number of selected elements matches the total number of rows. */
//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.length;
//     return numSelected == numRows;
//   }

//   /** Selects all rows if they are not all selected; otherwise clear selection. */
//   masterToggle() {
//     this.isAllSelected() ?
//       this.selection.clear() :
//       this.dataSource.forEach(row => this.selection.select(row));
//   }

//   toggleCheckbox(event, section, source, index) {
//     if (event.checked) {
//       section.get("form_endpoint_step_subsections").insert(index, this.addControl(source, this.getMetricsData(source)));
//     }
//     else {
//       section.get("form_endpoint_step_subsections").removeAt(index)
//     }
//   }

//   checkValidation(event, section) {
//     if (event.value === 'fixed_amount') {
//       section.controls['form_endpoint_payment_subsection_preferences'].controls['prefilled_amount'].setValidators(Validators.required);
//     } else {
//       section.controls['form_endpoint_payment_subsection_preferences'].controls['prefilled_amount'].clearValidators()
//     }
//     section.controls['form_endpoint_payment_subsection_preferences'].controls['prefilled_amount'].updateValueAndValidity()
//   }

//   validateNumbers(event: any) {
//     return (utils.validateNumbers(event));
//   }

//   addToEmailTo(event: MatChipInputEvent, index): void {
//     const input = event.input;
//     const value = event.value;
//     if ((value || '').trim()) {
//       if (utils.validateEmailSyntax(value)) {
//         if (this.dataSource[index].email.findIndex(item => item === value) === -1) {
//           this.dataSource[index].email.push(value.trim());
//         }
//         this.dataSource[index].validEmail = true;
//       } else {
//         this.dataSource[index].validEmail = false;
//         setTimeout(() => {
//           this.dataSource[index].validEmail = true;
//         }, 5000);
//       }
//     }
//     // Reset the input value
//     if (input) {
//       input.value = '';
//     }
//   }

//   checkForCheckBox(code) {
//     return this.queryParams.endpoint_uuid && (this.locationEndpointDetail.form_endpoint.form_endpoint_steps[0].form_endpoint_step_sections[0].form_endpoint_step_subsections.findIndex(ele => ele.question_subsection_type_data_metric.code === code) > -1)
//   }

//   removeFromEmailTo(item: any, i): void {
//     const index = this.dataSource[i].email.indexOf(item);
//     if (index >= 0) {
//       this.dataSource[i].email.splice(index, 1);
//     }
//   }

//   notificationTriggerError() {
//     if (this.selection.selected.length > 0) {
//       for (var i = 0; i < this.selection.selected.length; i++) {
//         if (this.selection.selected[i].email.length == 0) {
//           return true;
//         }
//       }
//     }
//     return false;
//   }

//   getAveEmotions(element) {
//     return element && utils.getSentimentIcon(element.code);
//   }

// }
