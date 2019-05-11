import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as moment from 'moment';
import * as MG from 'metrics-graphics';
import * as _ from 'underscore';
import { TestingService } from '../../@core/services';

@Component({
  selector: 'slp-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
})

export class TestingComponent implements OnInit {
  options: FormGroup;
  reportHtml: string;
  report: any;

  isReported: boolean;


  constructor(private fb: FormBuilder, private api: TestingService) {
    this.options = fb.group({
      color: 'primary',
      arrivalRate: [16, Validators.min(10)],
      duration: [30, Validators.min(10)],
      //count: [300, Validators.min(100)],
      url: 'http://www.smartm2m.co.kr',
    });
    this.reportHtml = "";
    this.isReported = false;
  }

  ngOnInit() {
  }

  runTesting() {
    const req = {
      rate: this.options.value.arrivalRate,
      duration: this.options.value.duration,
      //count: this.options.value.count,
      url: this.options.value.url,
    };

    this.api.quick(req).subscribe(
      (data: any) => {
        console.log(data);
        if (data.report) {
          this.report = data.report;
          this.composeReport(data.report);
          this.isReported = true;
        }
      });
  }

  composeReport(Report) {
    let l = _;

    $('#timestamp').html(moment(Report.aggregate.timestamp).format('DD MMM YYYY HH:mm:SS'));
    $('#testDuration').html(l.size(Report.intermediate) * 10);
    $('#scenariosCompleted').html(Report.aggregate.scenariosCompleted);
    $('#scenariosCreated').html(Report.aggregate.scenariosCreated);

    let markers = [];
    if (l.size(Report.phases) > 0) {
      markers = l.foldl(Report.phases, function(acc, phase, index) {
        let label = phase.name || 'Phase ' + (index + 1);
        let timestamp = (index === 0) ? 0 : Report.phases[index - 1].duration + acc[index - 1].timestamp;

        acc.push({
          timestamp: timestamp,
          label: label,
        });

        return acc;
      }, []);
    }

    if (l.size(Report.aggregate.scenarioCounts) > 0) {
      l.each(Report.aggregate.scenarioCounts, function(count, name) {
        let $tdName = $('<td>' + name + '</td>');
        let percentage = Math.round(count / Report.aggregate.scenariosCreated * 100 * 1000) / 1000;
        let $tdCount = $('<td>' + count + ' (' + percentage + '%)' + '</td>');
        let $el = $('<tr></tr>')
          .append($tdName)
          .append($tdCount)
          .appendTo($('#scenarioCounts'));
      });
    } else {
      $('#scenarioCountsContainer').hide();
    }

    if (l.size(Report.aggregate.codes) > 0) {
      l.each(Report.aggregate.codes, function(count, code) {
        let anchor = '';
        if (code >= 100 && code < 200) {
          anchor = '#1xx_Informational';
        } else if (code >= 200 && code < 300) {
          anchor = '#2xx_Success';
        } else if (code >= 300 && code < 400) {
          anchor = '#3xx_Redirection';
        } else if (code >= 400 && code < 500) {
          anchor = '#4xx_Client_Error';
        } else if (code >= 500 && code < 600) {
          anchor = '#5xx_Server_Error';
        }

        let $a = $('<a>' + code + '</a>').attr('href', 'https://en.wikipedia.org/wiki/List_of_HTTP_status_codes' + anchor);
        let $td = $('<td></td>').append($a);
        let $el = $('<tr></tr>')
            .append($td)
            .append($('<td>' + count + '</td>'))
            .appendTo($('#codes'));
      });
    } else {
      $('#codesContainer').hide();
    }

    if (l.size(Report.aggregate.errors) > 0) {
      l.each(Report.aggregate.errors, function(count, code) {
        let $el = $('<tr></tr>')
            .append($('<td>' + code + '</td>'))
            .append($('<td>' + count + '</td>'))
            .appendTo($('#errors'));
      });
    } else {
      $('#errorsContainer > p').html('&#10004; Test completed without network or OS errors.');
    }

    let histogramData = l.map(Report.aggregate.latency, function(v, k) { return {bin: k, value: v}; });

    // MG.data_graphic({
    //   chart_type: 'bar',
    //   x_label: 'Percentile',
    //   y_label: '(ms)',
    //   animate_on_load: true,
    //   title: 'Overall Latency Distribution',
    //   description: 'Distribution of all observed response latencies',
    //   target: '.latency-histogram',
    //   data: histogramData,
    //   x_accessor: 'bin',
    //   y_accessor: 'value',
    //   binned: true,
    //   height: 250,
    //   interpolate: 'monotone',
    //   padding_percentage: 0,
    //   bar_orientation: 'vertical',
    //   width: 450
    // });

    let chartData = l.map(
      Report.intermediate,
      function(o, i) {
        return {
          timestamp: i * 10 + 10,

          rpsMean: o.rps.mean,
          rpsCount: o.rps.count,
          concurrency: o.concurrency,
          latencyMax: o.latency.max,
          latencyp99: o.latency.p99,
          latencyp95: o.latency.p95,
          latencyMedian: o.latency.median,
          latencyMin: o.latency.min,
        };
      });

    //
    // Response codes
    //

    if (l.size(Report.aggregate.codes) > 0) {
      let codesData = l.foldl(Report.intermediate, function(acc, o, i) {
        let res = {
          timestamp: i * 10 + 10,
        };

        l.each(o.codes, function(count, code) {
          res[code] = count;
        });
        acc.push(res);
        return acc;
      }, []);
      let uniqueCodes = l.foldl(Report.intermediate, function(acc, o) {
        l.each(o.codes, function(count, code) {
          if (l.indexOf(acc, code) === -1) {
            acc.push(code);
          }
        });
        return acc;
      }, []);

      MG.data_graphic({
        x_label: 'Time',
        y_label: 'Count',
        title: 'HTTP codes',
        description: 'Occurence of HTTP response codes',
        target: '.codes-line',
        data: codesData,
        x_accessor: 'timestamp',
        y_accessor: uniqueCodes,
        legend: uniqueCodes,
        right: 50,
        chart_type: 'line',
        area: false,
        markers: markers,
        width: 900,
      });
    }

    //
    // Errors
    //

    if (l.size(Report.aggregate.errors) > 0) {
      let errorData = l.foldl(Report.intermediate, function(acc, o, i) {
        let res = {
          timestamp: i * 10 + 10,
        };

        l.each(o.errors, function(count, name) {
          res[name] = count;
        });
        acc.push(res);
        return acc;
      }, []);
      let uniqueErrors = l.foldl(Report.intermediate, function(acc, o) {
        l.each(o.errors, function(count, name) {
          if (l.indexOf(acc, name) === -1) {
            acc.push(name);
          }
        });
        return acc;
      }, []);

      MG.data_graphic({
        title: 'Error Codes',
        description: 'Occurence of error codes',
        target: '.errors-line',
        data: errorData,
        x_accessor: 'timestamp',
        y_accessor: uniqueErrors,
        chart_type: 'line',
        area: false,
        markers: markers,
      });

    }

    //
    // Latency
    //
    // MG.data_graphic({
    //   chart_type: 'line',
    //   x_label: 'Time',
    //   y_label: '(ms)',
    //   animate_on_load: true,
    //   area: false,
    //   title: "Latency At Intervals",
    //   description: "Latency values at different points during the test run",
    //   data: chartData,
    //   target: '.latency',
    //   width: 900,
    //   x_accessor: 'timestamp',
    //   y_accessor: ['latencyMin', 'latencyMedian', 'latencyp95', 'latencyMax'],
    //   legend: ['min', 'p50', 'p95', 'max'],
    //   //legend_target: '.latency-legend',
    //   right: 50,
    //   interpolate: 'monotone',
    //   mouseover: function(d, i) {
    //   },
    //   markers: markers
    // });

    MG.data_graphic({
      //animate_on_load: true,
      area: false,
      y_label: 'Count',
      x_label: 'Time',
      title: 'Concurrent users',
      description: 'Concurrent users',
      data: chartData,
      target: '.concurrency',
      x_accessor: 'timestamp',
      y_accessor: ['concurrency'],
      //interpolate: 'monotone',
      markers: markers,
      width: 900,
    });

    MG.data_graphic({
      //animate_on_load: true,
      area: false,
      y_label: 'Count',
      x_label: 'Time',
      title: 'Mean RPS',
      description: 'Mean requests per second',
      data: chartData,
      target: '.rps-mean',
      x_accessor: 'timestamp',
      y_accessor: ['rpsMean'],
      interpolate: 'monotone',
      markers: markers,
      width: 900,
    });

    MG.data_graphic({
      //animate_on_load: true,
      area: false,
      y_label: 'Count',
      x_label: 'Time',
      title: 'RPS Count',
      description: 'Count of requests per second',
      data: chartData,
      target: '.rps-count',
      x_accessor: 'timestamp',
      y_accessor: ['rpsCount'],
      interpolate: 'monotone',
      markers: markers,
      width: 900,
    });
  }
}
