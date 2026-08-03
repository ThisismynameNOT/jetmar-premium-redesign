import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, validateQuote } from '../dist/assets/lib.js';
import { projects } from '../dist/assets/data.js';

test('filters heritage projects', () => {
  const items = filterProjects(projects, 'heritage');
  assert.ok(items.length >= 2);
  assert.ok(items.every(item => item.category === 'heritage'));
});

test('validates a complete roofing quote', () => {
  const errors = validateQuote({ buildingType:'Bytový dům', roofType:'Plochá střecha', area:220, problem:'Zatékání kolem atiky a prostupů.', district:'Praha 3', timeframe:'Do 3 měsíců', name:'Jan Novák', phone:'+420 777 111 222', email:'jan@example.cz' });
  assert.deepEqual(errors, {});
});

test('rejects incomplete roofing quote', () => {
  const errors = validateQuote({});
  assert.ok(errors.email && errors.roofType && errors.area);
});
